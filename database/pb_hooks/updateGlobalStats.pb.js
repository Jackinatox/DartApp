/// <reference path="../data/types.d.ts" />

// routerAdd("GET", "/hello/{name}", (e) => {
//     let name = e.request.pathValue("name")

//     return e.json(200, { "message": "Hello du Lulatsch " + name })
// })


onRecordUpdate(async (e) => {
    const pb = e.app;
    e.next()
    pb.logger().info(`Starting event Handler`);

    try {
        const result = new DynamicModel({
            singles: 0,
            doubles: 0,
            triples: 0,
            misses: 0,
            total: 0,
        });

        await pb.db()
            .newQuery(`SELECT SUM(singles) as singles, sum(doubles) as doubles, SUM(triples) as triples, SUM(misses) as misses, SUM(singles) * 20 + sum(doubles) * 40 + SUM(triples) * 60 as total
                FROM Throws`)
            .one(result);


        pb.logger().info(`Total Points: ${result.total}`);
        pb.logger().info(`Result object: ${JSON.stringify(result)}`);

        let allRecs = pb.findAllRecords("GlobalStats");   
        if(allRecs.length === 0) {
            pb.logger().warn("Creating new Stats Record");
            pb.logger().error("Creating new Stats Record Not implemented yet");
            // let record = new Record(pb).set('singles', result.singles).set('doubles', result.doubles).set('triples', result.triples).set('misses', result.misses).set('total', result.total);
            // pb.save(record);   
        } else {
            let record = allRecs[0];   
            pb.logger().info(`Editing Existring record, old: ${JSON.stringify(record)}`);
            record.set('TotalSingle', result.singles);
            record.set('TotalDouble', result.doubles);
            record.set('TotalTriple', result.triples);
            record.set('TotalMisses', result.misses);
            record.set('TotalPoints', result.total);   // Update it with new data
            pb.logger().info(`Editing Existring record, new: ${JSON.stringify(record)}`);
            pb.save(record);  
        }
    } catch (e) {
        pb.logger().error(`My Custom Thingy: ${e}`);
    }
}, "Throws")
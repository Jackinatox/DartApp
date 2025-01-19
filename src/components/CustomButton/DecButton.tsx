import { Button, Box, ColorPaletteProp, ButtonPropsColorOverrides } from '@mui/joy'
import { OverridableStringUnion } from '@mui/types';
import React from 'react'


interface DecButtonProps {
    onClick: () => void;
    onDecrease: () => void;
    points: number;
    disabled: boolean;
    mainLabel: string;
    color?: OverridableStringUnion<ColorPaletteProp, ButtonPropsColorOverrides>;
}

const DecButton: React.FC<DecButtonProps> = ({ color, disabled, onClick, mainLabel: label, onDecrease, points }) => {
    return (
        <Box display="flex">
            <Button
                onClick={onClick}
                color={color}
                disabled={disabled}
                sx={{
                    padding: '20px',
                    fontSize: '18px',
                    flex: 1,
                }}
            >
                {label + " (" + points + ")"}
            </Button>
            <Button
                onClick={onDecrease}
                color="danger"
                variant="outlined"
                disabled={disabled}
                sx={{
                    padding: '20px',
                    fontSize: '18px',
                    flex: 0.1,
                    marginLeft: '10px',
                }}
            >
                -1
            </Button>
        </Box>
    )
}

export default DecButton
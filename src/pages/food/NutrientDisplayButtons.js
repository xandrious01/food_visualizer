import { useState } from "react";
import { Col, Button } from "reactstrap";

const NutrientDisplayButtons = ({ setDisplayState }) => {
    return (
        <Col className='toggleDataBtnsDiv col-2 flex-column'>
            <Button
                id="macrosNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_MACROS')
                }}>
                Macros
            </Button>

            <Button
                id="vitaminsNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_VITAMINS')
                }}>
                Vitamins
            </Button>

            <Button
                id="sugarsNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_SUGARS')
                }}>
                Fibers and Sugars
            </Button>

            <Button
                id="aminosNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_AMINOS')
                }}>
                Aminos
            </Button>
            <Button
                id="lipidsNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_LIPIDS')
                }}>
                Lipids
            </Button>
            <Button
                id="mineralsNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_MINERALS')
                }}>
                Minerals
            </Button>
            <Button
                id="otherNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_OTHER')
                }}>
                Other Nutrients
            </Button>
        </Col>
    )
}

export default NutrientDisplayButtons;
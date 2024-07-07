import { useState } from "react";
import { Col, Button } from "reactstrap";

const NutrientDisplayButtons = ({setDisplayState}) => {
    return (
        <Col className='toggleDataBtnsDiv col-2 flex-column'>
                        <Button
                            className='setDisplayBtn customNutrientButton'
                            onClick={() => {
                                return setDisplayState('DISPLAY_MACROS')
                            }}>
                            Macros
                        </Button>

                        <Button
                            className='setDisplayBtn customNutrientButton'
                            onClick={() => {
                                return setDisplayState('DISPLAY_VITAMINS')
                            }}>
                            Vitamins
                        </Button>

                        <Button
                            className='setDisplayBtn customNutrientButton'
                            onClick={() => {
                                return setDisplayState('DISPLAY_SUGARS')
                            }}>
                            Fibers and Sugars
                        </Button>

                        <Button
                            className='setDisplayBtn customNutrientButton'
                            onClick={() => {
                                return setDisplayState('DISPLAY_AMINOS')
                            }}>
                            Aminos
                        </Button>
                        <Button
                            className='setDisplayBtn customNutrientButton'
                            onClick={() => {
                                return setDisplayState('DISPLAY_LIPIDS')
                            }}>
                            Lipids
                        </Button>
                        <Button
                            className='setDisplayBtn customNutrientButton'
                            onClick={() => {
                                return setDisplayState('DISPLAY_MINERALS')
                            }}>
                            Minerals
                        </Button>
                        <Button
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
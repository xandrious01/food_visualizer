import { useState } from "react";
import { Button } from "reactstrap";

const NutrientDisplayButtons = ({setDisplayState}) => {
    return (
        <div className='toggleDataBtnsDiv d-flex'>
                        <Button
                            className='setDisplayBtn'
                            onClick={() => {
                                return setDisplayState('DISPLAY_MACROS')
                            }}>
                            Macros
                        </Button>

                        <Button
                            className='setDisplayBtn'
                            onClick={() => {
                                return setDisplayState('DISPLAY_VITAMINS')
                            }}>
                            Vitamins
                        </Button>

                        <Button
                            className='setDisplayBtn'
                            onClick={() => {
                                return setDisplayState('DISPLAY_SUGARS')
                            }}>
                            Fibers and Sugars
                        </Button>

                        <Button
                            className='setDisplayBtn'
                            onClick={() => {
                                return setDisplayState('DISPLAY_AMINOS')
                            }}>
                            Aminos
                        </Button>
                        <Button
                            className='setDisplayBtn'
                            onClick={() => {
                                return setDisplayState('DISPLAY_LIPIDS')
                            }}>
                            Lipids
                        </Button>
                        <Button
                            className='setDisplayBtn'
                            onClick={() => {
                                return setDisplayState('DISPLAY_MINERALS')
                            }}>
                            Minerals
                        </Button>
                        <Button
                            className='setDisplayBtn'
                            onClick={() => {
                                return setDisplayState('DISPLAY_OTHER')
                            }}>
                            Other Nutrients
                        </Button>
                    </div>
    )
}

export default NutrientDisplayButtons;
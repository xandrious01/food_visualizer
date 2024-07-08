
import { Col, Button } from "reactstrap";
import '../../styles/DisplayFood.css'


const NutrientDisplayButtons = ({ setDisplayState }) => {

    return (
        <Col className='toggleDataBtnsDiv col-2 flex-column'>
            <Button outline
                id="macrosNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_MACROS')
                }}>
                Macros
            </Button>

            <Button outline
                id="vitaminsNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_VITAMINS')
                }}>
                Vitamins
            </Button>

            <Button outline
                id="sugarsNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_SUGARS')
                }}>
                Fibers and Sugars
            </Button>

            <Button outline
                id="aminosNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_AMINOS')
                }}>
                Aminos
            </Button>
            <Button outline
                id="lipidsNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_LIPIDS')
                }}>
                Lipids
            </Button>
            <Button outline
                id="mineralsNutrientBtn"
                className='setDisplayBtn customNutrientButton'
                onClick={() => {
                    return setDisplayState('DISPLAY_MINERALS')
                }}>
                Minerals
            </Button>
            <Button outline
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
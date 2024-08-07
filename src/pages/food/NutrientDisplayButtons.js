
import { Col, Button } from "reactstrap";
import { useLocation } from "react-router-dom";
import '../../styles/DisplayFood.css'
import '../../styles/CompareFoods.css'



const NutrientDisplayButtons = ({ setDisplayState }) => {
    const {pathname} = useLocation();


    return (
        <div className={pathname === '/compare' ? 'compareFoodsNutrientBtns' : 'toggleDataBtnsDiv'}>
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
        </div>
    )
}

export default NutrientDisplayButtons;
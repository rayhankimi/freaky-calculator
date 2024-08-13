import {useState} from "react";


export default function Calculator() {

    const [currentInput, setCurrentInput] = useState<string>('');
    const [firstValue, setFirstValue] = useState<string | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [isOperatorClicked, setIsOperatorClicked] = useState<boolean>(false);

    const handleNumberClick = (inputtedNumber: string) => {
        if (currentInput === '0') {
            setCurrentInput(inputtedNumber);
            return;
        }
        if (isOperatorClicked) {
            setCurrentInput(inputtedNumber);
            setIsOperatorClicked(false);
        } else {
            setCurrentInput((prevNumber) => prevNumber + inputtedNumber);
        }
    }

    const handleClearClick = () => {
        setCurrentInput('0');
        setFirstValue(null);
        setOperator(null);
        setIsOperatorClicked(false);
    }

    const handleBackspaceClick = () => {
        if (currentInput.length > 1){
            setCurrentInput(currentInput.slice(0, -1));
        } else {
            setCurrentInput('0')
        }
    }
    const handleOperatorClick = (operator: string) => {
        if (currentInput) {
            setFirstValue(currentInput);
            setOperator(operator);
            setIsOperatorClicked(true);
            setCurrentInput('');
        }
    }

    const handleEqualClick = () => {
        if (firstValue && operator && currentInput) {
            const result = calculate(Number(firstValue), operator, Number(currentInput));
            setCurrentInput(result.toString());
            setFirstValue(null);
            setOperator(null);
            setIsOperatorClicked(false);
        }
    }

    const calculate = (firstValue: number, operator: string, secondValue: number) => {
        if(operator === '/' && secondValue === 0){
            return 'Banned';
        }
        switch (operator) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case 'X':
                return firstValue * secondValue;
            case '/':
                return firstValue / secondValue;
        }
    }

    if(currentInput === 'Banned'){
        return(
            <div>
                <h1 className="banned"> You've been banned from using this calculator</h1>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="calculator">
                <input className="calc-numbers" type="text" value={currentInput}/>
                <div className="calc-buttons">
                    <button onClick={() => handleClearClick()} className="btn is-clear span-2 maroon operator">Clear
                    </button>
                    <button onClick={() => handleBackspaceClick()} className="btn dark-green operator">&larr;</button>
                    <button onClick={() => handleOperatorClick('/')} className="btn teal operator">&divide;</button>

                    <button onClick={() => handleNumberClick('7')} className="btn">7</button>
                    <button onClick={() => handleNumberClick('8')} className="btn">8</button>
                    <button onClick={() => handleNumberClick('9')} className="btn">9</button>
                    <button onClick={() => handleOperatorClick('X')} className="btn teal operator">X</button>

                    <button onClick={() => handleNumberClick('4')} className="btn">4</button>
                    <button onClick={() => handleNumberClick('5')} className="btn">5</button>
                    <button onClick={() => handleNumberClick('6')} className="btn">6</button>
                    <button onClick={() => handleOperatorClick('-')} className="btn teal operator">-</button>

                    <button onClick={() => handleNumberClick('1')} className="btn">1</button>
                    <button onClick={() => handleNumberClick('2')} className="btn">2</button>
                    <button onClick={() => handleNumberClick('3')} className="btn">3</button>
                    <button onClick={() => handleOperatorClick('+')} className="btn teal operator">+</button>

                    <button onClick={() => handleNumberClick('0')} className="btn span-3">0</button>
                    <button onClick={() => handleEqualClick()} className="btn teal operator">=</button>

                </div>
            </div>
        </div>
    )

}
import {Form, InputGroup} from "react-bootstrap"

export const StyledInputGroup = (props) => {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>
                {props.label}
            </InputGroup.Text>
            <Form.Control aria-describedby={props.label} value={props.value} onChange={props.onChange} />
        </InputGroup>
    )
}
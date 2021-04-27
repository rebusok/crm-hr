import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";
import style from './EditableSpanText.module.scss'
import {SortEnum, TypeSort} from "../../store/TableReducer/TableType";

type EditableSpanType = {
    value:string
    onChanges: (newValue:string, id:string) => void
    blured: boolean
    typeSpan: TypeSort
    idRow:string
}

const EditableSpanText = React.memo((props:EditableSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.value)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {

        setTitle(e.currentTarget.value);
    }
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value)
    }
    const activateViewMetod = () => {
        setEditMode(false);
        props.onChanges(title, props.idRow);
    }

    return (
        editMode
            ? props.typeSpan === SortEnum.STRING
            ?<TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMetod}/>
            : props.typeSpan === SortEnum.DATE
                ?   <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue={props.value.split('.').join('-')}
                    onChange={changeTitle} autoFocus onBlur={activateViewMetod}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                : <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMetod}/>
            : props.blured
            ? <span onDoubleClick={activateEditMode} className={style.editSpan}>{props.value}</span>
            : null
    )
})

export default EditableSpanText;
import React, {ChangeEvent, useEffect, useState} from 'react';
import {ApiAuth, ApiCandidatePack} from "../../Api/Api";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {StatusEnum, StatusType, TotalEnum, TotalType} from "../../store/TableReducer/TableType";


const user_id = '60914ab8a9c7250c8cfbb0ae'
// const packName = 'Юрий'
// const searchStatus = 'думает'
const Registration = () => {
    const [login,setLogin] = useState<string>('yury.grush@gmail.com')
    const [password, setPassword] = useState<string>('223044ss')
    const optionsArrayStatus = [StatusEnum.OK, StatusEnum.NO, StatusEnum.THINK]
    const optionsArrayTotal = [TotalEnum.OFER, TotalEnum.CANSEL, TotalEnum.CANSEL_LID, TotalEnum.TRANING]
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [ optionsHeadStatus, setOptionsHeadStatus] = useState<StatusType | ''>('')
    const [ optionsHeadStatus2, setOptionsHeadStatus2] = useState<TotalType | ''>('')
    const loginHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setLogin(e.currentTarget.value)
    }
    const passwordHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    useEffect(() => {
        if(optionsHeadStatus === '' && optionsHeadStatus2 === '') return
        ApiCandidatePack.getCandidatesPack(user_id, undefined, optionsHeadStatus, optionsHeadStatus2).then(res =>  console.log(res))
    }, [optionsHeadStatus, optionsHeadStatus2])
    const sendPassword = () => {
        ApiAuth.registration(login, password).then(res => console.log(res)).catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log(error)
            console.log('Error:', {...e})
        })
    }
    const testSendNewPack = () => {

    }
    const testGetPack = () => {
        ApiCandidatePack.getCandidatesPack(user_id,undefined, undefined, undefined, '1SS').then(res =>  console.log(res))
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleOpen2 = () => {
        setOpen2(true);
    };
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setOptionsHeadStatus(event.target.value as StatusType );
    };
    const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
        setOptionsHeadStatus2(event.target.value as TotalType );
    };

    return (
        <div>
            <input type="text" value={login} placeholder={'login'} onChange={e => loginHandler(e)}/>
            <input type="text" value={password} placeholder={'password'} onChange={e => passwordHandler(e)}/>

            <button onClick={sendPassword}>send</button>
            <button onClick={testSendNewPack}>NEW PACk</button>
            <button onClick={testGetPack}>GET PACk</button>


            <div>
                <Select
                    labelId={optionsArrayStatus[0] + 'label'}
                    id={optionsArrayStatus[0] }
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    defaultValue={''}
                    value={optionsHeadStatus}
                    onChange={handleChange}
                >
                    {
                        optionsArrayStatus && optionsArrayStatus.map((el, index) => {
                            return (
                                <MenuItem key={el + index} value={el}>{el}</MenuItem>
                            )
                        })
                    }
                </Select>
            </div>
            <div>
                <Select
                    labelId={optionsArrayTotal[0] + 'label'}
                    id={optionsArrayTotal[0] }
                    open={open2}
                    onClose={handleClose2}
                    onOpen={handleOpen2}
                    defaultValue={''}
                    value={optionsHeadStatus2}
                    onChange={handleChange2}
                >
                    {
                        optionsArrayTotal && optionsArrayTotal.map((el, index) => {
                            return (
                                <MenuItem key={el + index} value={el}>{el}</MenuItem>
                            )
                        })
                    }
                </Select>
            </div>

            <div>
                <h1>UPDATE</h1>

            </div>
        </div>


    );
};

export default Registration;
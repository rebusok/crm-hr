import React, {useState} from 'react';
import {Container, createStyles, makeStyles} from '@material-ui/core';
import {
    DataGrid,
    getGridStringOperators,
    GridColDef,
    GridColTypeDef,
    GridFilterToolbarButton,
    GridLinkOperator,
    GridRowId,
    GridToolbarContainer, GridValueGetterParams
} from '@material-ui/data-grid';
import {renderCellExpand} from "../../helper/helper";
import {RoutingType} from "../../routes/Routes";
import {NavLink} from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

import EdditSs from "../../components/EdditSS";
import Modal from '../../components/Modal/Modal';


export const currentyTime = Intl.DateTimeFormat('ru-Ru', {
    hour: '2-digit',
    minute: '2-digit',

})
export const currentDate = Intl.DateTimeFormat('ru-Ru', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',

})

function CustomToolbar() {
    return (
        <GridToolbarContainer>

            <GridFilterToolbarButton/>
        </GridToolbarContainer>
    );
}

const col: GridColDef[] = [
    {field: 'date', headerName: 'Дата', width: 130, type: 'date',
        valueFormatter:(value => currentDate.format(new Date(value.value as Date))) },
    {
        field: 'time', headerName: 'Время', width: 130, type: "dateTime" ,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.getValue('date') || ''}`,
        valueFormatter: (value) => currentyTime.format(new Date(value.value as Date)),
    },
    {field: 'name', headerName: 'ФИО', width: 130, renderCell: renderCellExpand},
    {
        field: 'position', headerName: 'Должность', width: 130,

    },

    {
        field: 'meeting',
        headerName: 'Встреча',
        type: 'boolean',
        width: 90,
        // renderCell: (params: GridCellParams) => (
        //     <strong>
        //         {(params.value as Boolean)}
        //         <Button
        //             variant="contained"
        //             color="primary"
        //             size="small"
        //             style={{ marginLeft: 16 }}
        //
        //         >
        //             Open
        //         </Button>
        //     </strong>
        // ),
    },


    {
        field: 'status',
        headerName: 'Итог',
        cellClassName: (params => {
            if (params.getValue('status') === 'подошел') {
                return 'open'
            } else if (params.getValue('status') === 'отказ') {
                return 'close'
            } else if (params.getValue('status') === 'думает') {
                return 'medium'
            } else {
                return ''
            }
        }),

        width: 120,
    },
    {
        field: 'recomendation',
        headerName: 'Рекомендация',
        width: 200,
        renderCell: renderCellExpand
    },
    {
        field: 'total',
        headerName: 'Итог 2.0',
        width: 100,
        renderCell: renderCellExpand
    },
    {
        field: 'SS',
        headerName: 'SS',
        width: 120,
        type: 'date',
        valueFormatter:(value => {
             if(value.value === null) {
                return null
            } else {
                 return  currentDate.format(new Date(value.value as Date))
            }
        })
    }

];

const stringColumnType: GridColTypeDef = {
    extendType: 'string',
    headerName: 'test',
    filterOperators: getGridStringOperators()
        .filter((operator) => operator.value === 'contains')
        .map((operator) => {

            return {

                ...operator,
                label: 'Совпадения'
            };
        }),
};


//стили
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            '& .open': {
                background: 'green'
            },
            '& .close': {
                background: 'red'
            },
            '& .medium': {
                background: 'blue'
            },
        }
    }),
);


const MainPage = () => {
    const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
    const rows = useSelector((state:AppRootStateType)  => state.tableRows)
    const classes = useStyles();
    const [modal, setModal] = useState<boolean>(false)
    const columns = React.useMemo(() => {
        if (col.length > 0) {

            return col.map((dataColumn) => {
                const mappedColumn = {
                    ...dataColumn,

                };

                if (mappedColumn.field === 'name') {

                    mappedColumn.type = 'customName';
                }
                return mappedColumn;
            });

        }
        return [];
    }, []);
    const selectionHandler = () => {


        console.log(selectionModel)
    }

    return (
        <div >
            <Container style={{display: 'flex', marginTop:'20px'}}>
                <div style={{ width: '100%'}}>
                    <DataGrid rows={rows}
                              componentsProps={{toolbar: {myCustomProp: 8}}}
                              columns={columns}
                              pageSize={15}
                              loading={rows.length === 0}
                              disableColumnMenu
                              className={classes.root}

                              components={{
                                  Toolbar: CustomToolbar,
                              }}
                              autoHeight={true}
                              columnTypes={{customName: stringColumnType}}
                              filterModel={{
                                  items: [
                                      {columnField: 'name', operatorValue: 'contains'},
                                  ],
                                  linkOperator: GridLinkOperator.Or
                              }}
                              onSelectionModelChange={(newSelection) => {
                                  setSelectionModel(newSelection.selectionModel);
                              }}
                    />
                </div>
                <div>
                    {
                        selectionModel.length > 0 ?
                            <NavLink to={`${RoutingType.EDIT}/${rows[+selectionModel[0] - 1].id}`}> edit</NavLink>
                            : null
                    }
                </div>
                <div>

                    {selectionModel.length > 0?
                        <>
                            <button type="button" onClick={() => setModal(true)}>
                                Open Modal
                            </button>
                            <Modal
                                modal={modal}
                                setModal={setModal}>
                                <EdditSs row={rows[+selectionModel[0] - 1]}/>
                            </Modal></>
                        : null
                    }
                </div>
            </Container>
            <button onClick={selectionHandler}>Test</button>
        </div>
    );
};

export default MainPage;
import {GridCellParams} from "@material-ui/x-grid";
import {createStyles, makeStyles, Paper, Popper, Typography} from "@material-ui/core";
import React from "react";
import {isOverflown} from "@material-ui/data-grid";
import {Order, OrderEnum, SortEnum, TableRowType} from "../store/TableReducer/TableType";

interface GridCellExpandProps {
    value: string;
    width: number;
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            alignItems: 'center',
            lineHeight: '24px',
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            '& .cellValue': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
        },
    }),
);

const GridCellExpand = React.memo(function GridCellExpand(
    props: GridCellExpandProps,
) {
    const { width, value } = props;
    const wrapper = React.useRef<HTMLDivElement | null>(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const classes = useStyles();
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current!);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent: KeyboardEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <div
            ref={wrapper}
            className={classes.root}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cellDiv}
                style={{
                    height: 1,
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <div ref={cellValue} className="cellValue">
                {value}
            </div>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width, marginLeft: -17 }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </div>
    );
});

 export function renderCellExpand(params: GridCellParams) {
    return (
        <GridCellExpand
            value={params.value ? params.value.toString() : ''}
            width={params.colDef.width}
        />
    );
}

export const currentyTime = Intl.DateTimeFormat('ru-Ru', {
    hour: '2-digit',
    minute: '2-digit',

})
export const currentDate = Intl.DateTimeFormat('ru-Ru', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',

})

export const setTime = (data:string, time: string, row?: any) => {
    const date = new Date(row? row.date : null)
    const arrDate = data?.split('-').map(el => (+el))
    const arrayTime = time?.split(':').map(el => +el)
    date.setFullYear(arrDate[0], arrDate[1] - 1, arrDate[2])
    date.setHours(arrayTime[0], arrayTime[1])
    return date.toISOString()

}
export const setYear = (data:string) => {

     if(data.trim() === '') return null
    const arrDate = data?.split('-').map(el => (+el))
    return new Date(arrDate[0], arrDate[1] - 1, arrDate[2] +1).toISOString()
}
export const smartSorting = (rows: TableRowType[], typeSorting: string, sortByValue: Order, keyValue: string) => {

    if (typeSorting === SortEnum.NUMBER) {
        sortByValue === OrderEnum.ASC
            ? rows.sort(function (a, b) {
                return b[keyValue] - a[keyValue]
            })
            : rows.sort(function (a, b) {
                return a[keyValue] - b[keyValue]
            })
    }
    if (typeSorting === SortEnum.STRING) {
        sortByValue === OrderEnum.ASC
            ? rows.sort(function (a, b) {

                if (a[keyValue].toLowerCase() < b[keyValue].toLowerCase()) //сортируем строки по возрастанию
                    return -1
                if (a[keyValue].toLowerCase() > b[keyValue].toLowerCase())
                    return 1
                return 0
            })
            : rows.sort(function (a, b) {
                if (a[keyValue].toLowerCase() > b[keyValue].toLowerCase()) //сортируем строки по возрастанию
                    return -1
                if (a[keyValue].toLowerCase() < b[keyValue].toLowerCase())
                    return 1
                return 0
            })
    }
    if (typeSorting === SortEnum.DATE) {

        sortByValue === OrderEnum.ASC
            ? rows.sort(function (a, b) {
                const dateA = new Date(a[keyValue]).getTime(),
                    dateB = new Date(b[keyValue]).getTime()

                return dateB - dateA
            })
            : rows.sort((a, b) => {
                const dateA = new Date(a[keyValue]).getTime(),
                    dateB = new Date(b[keyValue]).getTime()
                return dateA - dateB

            })
    }
    if (typeSorting === SortEnum.BOOLEAN) {
        sortByValue === OrderEnum.ASC
            ? rows.sort(function (a, b) {
                return (a[keyValue] === b[keyValue]) ? 0 : a[keyValue] ? -1 : 1;
            })
            : rows.sort(function (a, b) {
                return (a[keyValue] === b[keyValue]) ? 0 : a[keyValue] ? 1 : -1;
            })
    }
    return rows
}

export const changeFinDate = (date:string) => {
    const newDate = new Date(Date.parse(date)).setHours(23, 59, 59)

    return  new Date(newDate).toISOString()
}
export const changeStartDate = (date:string) => {
    const newDate = new Date(Date.parse(date)).setHours(0, 0, 0)
    return  new Date(newDate).toISOString()
}
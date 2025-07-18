import { ResponsiveLine } from '@nivo/line'

export function Graph({ data, index }) {

    const theme = {
        "background": "transparent",
        "text": {
            "fontSize": 11,
            "fill": "#ffffff",
            "outlineWidth": 0,
            "outlineColor": "#ffffff"
        },
        "axis": {
            "domain": {
                "line": {
                    "stroke": "#3838fff38",
                    "strokeWidth": 1
                }
            },
            "legend": {
                "text": {
                    "fontSize": 12,
                    "fill": "#b0b0b0",
                    "outlineWidth": 0,
                    "outlineColor": "#ffffff"
                }
            },
            "ticks": {
                "line": {
                    "stroke": "#303030",
                    "strokeWidth": 1
                },
                "text": {
                    "fontSize": 11,
                    "fill": "#8f8f8f",
                    "outlineWidth": 0,
                    "outlineColor": "#ffffff"
                }
            }
        },
        "grid": {
            "line": {
                "stroke": "#383838",
                "strokeWidth": 1
            }
        },
        "legends": {
            "title": {
                "text": {
                    "fontSize": 11,
                    "fill": "#333333",
                    "outlineWidth": 0,
                    "outlineColor": "#ffffff"
                }
            },
            "text": {
                "fontSize": 11,
                "fill": "#c7c7c7",
                "outlineWidth": 0,
                "outlineColor": "#ffffff"
            },
            "ticks": {
                "line": {},
                "text": {
                    "fontSize": 10,
                    "fill": "#333333",
                    "outlineWidth": 0,
                    "outlineColor": "#ffffff"
                }
            }
        },
        "annotations": {
            "text": {
                "fontSize": 12,
                "fill": "#333333",
                "outlineWidth": 2,
                "outlineColor": "#fafafa",
                "outlineOpacity": 1
            },
            "link": {
                "stroke": "#000000",
                "strokeWidth": 1,
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            },
            "outline": {
                "stroke": "#000000",
                "strokeWidth": 2,
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            },
            "symbol": {
                "fill": "#ffffff",
                "outlineWidth": 1,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            }
        },
        "tooltip": {
            "wrapper": {},
            "container": {
                "background": "#303030",
                "color": "#ffffff",
                "fontSize": 12
            },
            "basic": {},
            "chip": {},
            "table": {},
            "tableCell": {},
            "tableCellValue": {}
        },
        "crosshair": {
            "line": {
                "stroke": "#ffffff", // Set hover line (crosshair) to white
                "strokeWidth": 1
            }
        }
    }

    return (
        <div className='w-full h-[30rem]'>
            <ResponsiveLine
                data={data}
                margin={{ top: 20, right: 20, bottom: 50, left: 80 }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                curve="monotoneX"
                axisBottom={{ legend: 'Day', legendOffset: 36 }}
                axisLeft={{ legend: 'Price', legendOffset: -60 }}
                colors={['#FE7743', '#ea580c', '#dc2626', '#b91c1c']}
                enablePoints={false}
                pointSize={10}
                useMesh={true}
                theme={theme}
                // legends={[
                //     {
                //         anchor: 'right',
                //         direction: 'column',
                //         translateX: 70,
                //         itemsSpacing: 5,
                //         itemWidth: 50,
                //         itemHeight: 20,
                //         symbolSize: 12,
                //         symbolShape: 'circle'
                //     }
                // ]}
                enableSlices="x"
                sliceTooltip={({ slice }) => {
                    return (
                        <div className='p-2 rounded-sm border-y-sky-50'
                            style={{
                                background: '#252525'
                            }}
                        >
                            {slice.points.map(point => (
                                <div className='p-1 w-max color'
                                    key={point.id}
                                    style={{
                                        color: point.seriesColor
                                    }}
                                >
                                    <strong>{point.seriesId}: </strong> {point.data.yFormatted}
                                </div>
                            ))}
                        </div>
                    )
                }}
                markers={[
                    {
                        axis: 'x',
                        value: data[0].data[index].x,
                        lineStyle: { stroke: '#E3E3E3', strokeWidth: 1 },
                        legend: 'Prediction starts here',
                        legendPosition: 'top',
                        textStyle: {
                            fill: '#E3E3E3',
                            fontSize: 12
                        }
                    },
                ]}
            />
        </div>
    )
}
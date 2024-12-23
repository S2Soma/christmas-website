const data = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "Dataviz by David Bacci: https://www.linkedin.com/in/davbacci/",
  "autosize": "pad",
  "padding": {
    "left": 5,
    "right": 0,
    "top": 5,
    "bottom": 0
  },
  "signals": [
    {
      "name": "height",
      "update": "pbiContainerHeight-65"
    },
    {
      "name": "width",
      "update": "pbiContainerWidth"
    },
    {
      "name": "showTooltips",
      "value": true
    },
    {
      "name": "showButtons",
      "value": true
    },
    {
      "name": "showDomainSpanLabel",
      "value": false
    },
    {
      "name": "startGrain",
      "value": "Months",
      "description": "Days, Months, Years or All"
    },
    {
      "name": "textColour",
      "value": "#666666"
    },
    {
      "name": "coloursDark",
      "value": [
        "#377eb9",
        "#4db04a",
        "#974ea2",
        "#ff8000",
        "#e61a1d"
      ]
    },
    {
      "name": "coloursLight",
      "value": [
        "#a5c8e4",
        "#b5dfb3",
        "#d3b0d9",
        "#ffcc99",
        "#f5a3a5"
      ]
    },
    {
      "name": "yRowHeight",
      "value": 33,
      "description": "Height in pixels"
    },
    {
      "name": "yRowPadding",
      "value": 0.22,
      "description": "Row padding as % of yRowHeight (each side)"
    },
    {
      "name": "yPaddingInner",
      "update": "yRowPadding * yRowHeight"
    },
    {
      "name": "taskColumnWidth",
      "value": 155
    },
    {
      "name": "startColumnWidth",
      "value": 45
    },
    {
      "name": "endColumnWidth",
      "value": 45
    },
    {
      "name": "daysColumnWidth",
      "value": 35
    },
    {
      "name": "progressColumnWidth",
      "value": 55
    },
    {
      "name": "columnPadding",
      "value": 15
    },
    {
      "name": "oneDay",
      "update": "1000*60*60*24"
    },
    {
      "name": "dayBandwidth",
      "update": "scale('x', timeOffset('day', datetime(2000,1,1),1)) - scale('x', datetime(2000,1,1))"
    },
    {
      "name": "dayBandwidthRound",
      "update": "(round(dayBandwidth *100)/100)"
    },
    {
      "name": "minDayBandwidth",
      "value": 20
    },
    {
      "name": "minMonthBandwidth",
      "value": 3
    },
    {
      "name": "minYearBandwidth",
      "value": 0.95
    },
    {
      "name": "milestoneSymbolSize",
      "value": 400
    },
    {
      "name": "arrowSymbolSize",
      "value": 70
    },
    {
      "name": "phaseSymbolHeight",
      "update": "bandwidth('y')-yPaddingInner-5"
    },
    {
      "name": "phaseSymbolWidth",
      "value": 10
    },
    {
      "name": "columnsWidth",
      "update": "taskColumnWidth+startColumnWidth+endColumnWidth+daysColumnWidth+progressColumnWidth+(columnPadding*5)"
    },
    {
      "name": "ganttWidth",
      "update": "width-columnsWidth-minDayBandwidth"
    },
    {
      "name": "dayExt",
      "update": "[data('xExt')[0]['s']-oneDay,data('xExt')[0]['s']+ ((ganttWidth-minDayBandwidth)/minDayBandwidth)*oneDay]"
    },
    {
      "name": "monthExt",
      "update": "[data('xExt')[0]['s']-oneDay ,data('xExt')[0]['s'] + ganttWidth/2*oneDay]"
    },
    {
      "name": "yearExt",
      "update": "[data('xExt')[0]['s']-oneDay,data('xExt')[0]['s'] + ganttWidth/0.35*oneDay]"
    },
    {
      "name": "allExt",
      "update": "[data('xExt')[0]['s']-oneDay,data('xExt')[0]['e']+oneDay*9]"
    },
    {
      "name": "xExt",
      "update": "startGrain=='All'?dayExt:startGrain=='Years'?yearExt:startGrain=='Months'?monthExt:dayExt"
    },
    {
      "name": "today",
      "update": "utc(year(now()),month(now()),date(now()))"
    },
    {
      "name": "todayRule",
      "update": "timeFormat(today,'%d/%m/%y')"
    },
    {
      "name": "zoom",
      "value": 1,
      "on": [
        {
          "events": "wheel!",
          "force": true,
          "update": "x()>columnsWidth?pow(1.001, (event.deltaY) * pow(16, event.deltaMode)):1"
        }
      ]
    },
    {
      "name": "xDomMinSpan",
      "update": "span(dayExt)"
    },
    {
      "name": "xDomMaxSpan",
      "update": "round((ganttWidth/0.13)*oneDay)"
    },
    {
      "name": "xDom",
      "update": "xExt",
      "on": [
        {
          "events": {
            "signal": "xDomPre"
          },
          "update": "span(xDomPre)<xDomMinSpan?[anchor + (xDom[0] - anchor) * (zoom*(xDomMinSpan/span(xDomPre))), anchor + (xDom[1] - anchor) * (zoom*(xDomMinSpan/span(xDomPre)))]:span(xDomPre)>xDomMaxSpan?[anchor + (xDom[0] - anchor) * (zoom*(xDomMaxSpan/span(xDomPre))), anchor + (xDom[1] - anchor) * (zoom*(xDomMaxSpan/span(xDomPre)))] :xDomPre"
        },
        {
          "events": {
            "signal": "delta"
          },
          "update": "[xCur[0] + span(xCur) * delta[0] / width, xCur[1] + span(xCur) * delta[0] / width]"
        },
        {
          "events": "dblclick",
          "update": "xExt"
        },
        {
          "events": "@buttonMarks:click",
          "update": "datum.text=='All'?allExt:datum.text=='Years'?yearExt:datum.text=='Months'?monthExt:datum.text=='Days'?dayExt:xDom"
        }
      ]
    },
    {
      "name": "scaledHeight",
      "update": "data('yScale').length * yRowHeight"
    },
    {
      "name": "yRange",
      "update": "[yRange!=null?yRange[0]:0,yRange!=null?yRange[0]+scaledHeight:scaledHeight]",
      "on": [
        {
          "events": [
            {
              "signal": "delta"
            }
          ],
          "update": "clampRange( [yCur[0] + span(yCur) * delta[1] / scaledHeight, yCur[1] + span(yCur) * delta[1] / scaledHeight],height>=scaledHeight?0: height-scaledHeight,height>=scaledHeight?height:scaledHeight)"
        },
        {
          "events": "dblclick",
          "update": "[0,scaledHeight]"
        },
        {
          "events": {
            "signal": "closeAll"
          },
          "update": "closeAll?[0, scaledHeight]:yRange"
        }
      ]
    },
    {
      "name": "xDomPre",
      "value": [
        0,
        0
      ],
      "on": [
        {
          "events": {
            "signal": "zoom"
          },
          "update": "[anchor + (xDom[0] - anchor) * zoom, anchor + (xDom[1] - anchor) * zoom]"
        }
      ]
    },
    {
      "name": "anchor",
      "value": 0,
      "on": [
        {
          "events": "wheel",
          "update": "+invert('x', x()-columnsWidth)"
        }
      ]
    },
    {
      "name": "xCur",
      "value": [
        0,
        0
      ],
      "on": [
        {
          "events": "pointerdown",
          "update": "slice(xDom)"
        }
      ]
    },
    {
      "name": "yCur",
      "value": [
        0,
        0
      ],
      "on": [
        {
          "events": "pointerdown",
          "update": "slice(yRange)"
        }
      ]
    },
    {
      "name": "delta",
      "value": [
        0,
        0
      ],
      "on": [
        {
          "events": [
            {
              "source": "window",
              "type": "pointermove",
              "consume": true,
              "between": [
                {
                  "type": "pointerdown"
                },
                {
                  "source": "window",
                  "type": "pointerup"
                }
              ]
            }
          ],
          "update": "down ? [down[0]-x(), y()-down[1]] : [0,0]"
        }
      ]
    },
    {
      "name": "down",
      "value": null,
      "on": [
        {
          "events": "pointerdown",
          "update": "xy()"
        },
        {
          "events": "pointerup",
          "update": "null"
        }
      ]
    },
    {
      "name": "phaseClicked",
      "value": null,
      "on": [
        {
          "events": "@taskSelector:click,@phaseOutline:click",
          "update": " yCur[0]==yRange[0] && yCur[1]==yRange[1]&& xCur[0]===xDom[0]&& xCur[1]===xDom[1] && datum.phase==datum.task?  {phase: datum.phase}:null",
          "force": true
        },
        {
          "events": "@taskTooltips:click",
          "update": " yCur[0]==yRange[0] && yCur[1]==yRange[1]&& xCur[0]===xDom[0]&& xCur[1]===xDom[1] && datum.datum.phase==datum.datum.task?  {phase: datum.datum.phase}:null",
          "force": true
        }
      ]
    },
    {
      "name": "itemHovered",
      "value": {
        "id": "",
        "dependencies": []
      },
      "on": [
        {
          "events": "@taskSelector:mouseover,@phaseOutline:mouseover,@milestoneSymbols:mouseover,@taskBars:mouseover,@taskNames:mouseover,@taskLabels:mouseover",
          "update": "{'id': toString(datum.id), 'dependencies':split(datum.dependencies,',')}"
        },
        {
          "events": "@taskTooltips:mouseover",
          "update": "{'id': toString(datum.datum.id), 'dependencies':split(datum.datum.dependencies,',')}"
        },
        {
          "events": "@taskSelector:mouseout,@phaseOutline:mouseout,@milestoneSymbols:mouseout,@taskBars:mouseout,@taskNames:mouseout,@taskLabels:mouseout,@taskTooltips:mouseout",
          "update": "{'id': '', 'dependencies':[]}"
        }
      ]
    },
    {
      "name": "hover",
      "value": "",
      "on": [
        {
          "events": "@buttonMarks:pointerover",
          "update": "datum.text?datum.text:''",
          "force": true
        },
        {
          "events": "@buttonMarks:pointerout",
          "update": "''",
          "force": true
        }
      ]
    },
    {
      "name": "closeAll",
      "on": [
        {
          "events": "@buttonMarks:click",
          "update": "datum.text=='Close'?true:false",
          "force": true
        }
      ]
    },
    {
      "name": "openAll",
      "on": [
        {
          "events": "@buttonMarks:click",
          "update": "datum.text=='Open'?true:false",
          "force": true
        }
      ]
    }
  ],
  "data": [
    {
      "name": "dataset"
    },
    {
      "name": "collapsedPhases",
      "on": [
        {
          "trigger": "phaseClicked",
          "toggle": "phaseClicked"
        },
        {
          "trigger": "closeAll",
          "remove": true
        },
        {
          "trigger": "closeAll",
          "insert": "data('phases')"
        },
        {
          "trigger": "openAll",
          "remove": true
        }
      ]
    },
    {
      "name": "input",
      "source": "dataset",
      "transform": [
        {
          "type": "formula",
          "as": "start",
          "expr": "utc(year(datum.start),month(datum.start),date(datum.start))"
        },
        {
          "type": "formula",
          "as": "end",
          "expr": "utc(year(datum.end),month(datum.end),date(datum.end))"
        },
        {
          "type": "formula",
          "as": "labelEnd",
          "expr": "datum.end"
        },
        {
          "type": "formula",
          "as": "end",
          "expr": "datetime(+datum.end+oneDay)"
        },
        {
          "type": "formula",
          "as": "days",
          "expr": "(datum.end-datum.start)/oneDay"
        },
        {
          "type": "window",
          "sort": {
            "field": "start",
            "order": "ascending"
          },
          "ops": [
            "rank"
          ],
          "as": [
            "taskSort"
          ],
          "groupby": [
            "phase"
          ]
        },
        {
          "type": "formula",
          "as": "start",
          "expr": "+datum.start"
        },
        {
          "type": "formula",
          "as": "end",
          "expr": "+datum.end"
        }
      ]
    },
    {
      "name": "phases",
      "source": "input",
      "transform": [
        {
          "type": "aggregate",
          "fields": [
            "start",
            "end",
            "task",
            "labelEnd"
          ],
          "ops": [
            "min",
            "max",
            "count",
            "max"
          ],
          "as": [
            "start",
            "end",
            "count",
            "labelEnd"
          ],
          "groupby": [
            "phase"
          ]
        },
        {
          "type": "formula",
          "as": "task",
          "expr": "datum.phase"
        },
        {
          "type": "formula",
          "as": "taskSort",
          "expr": "0"
        },
        {
          "type": "window",
          "sort": {
            "field": "start",
            "order": "ascending"
          },
          "ops": [
            "row_number",
            "row_number"
          ],
          "as": [
            "phaseSort",
            "id"
          ]
        },
        {
          "type": "formula",
          "as": "id",
          "expr": "length(data('input'))+datum.id+'^^^^^'"
        }
      ]
    },
    {
      "name": "phasePaths",
      "source": "phases",
      "transform": [
        {
          "type": "formula",
          "as": "phasePath",
          "expr": "'M ' + scale('x', datum.start)+' '  +   (scale('y', datum.id)+yPaddingInner) + ' H ' +  scale('x', datum.end)+' '   + ' v ' +  phaseSymbolHeight + ' L ' +  (scale('x', datum.end) - phaseSymbolWidth) +' '  +   (scale('y', datum.id)+yPaddingInner+phaseSymbolHeight/2 ) + ' L ' +  (scale('x', datum.start)+phaseSymbolWidth) + ' '  +   (scale('y', datum.id)+yPaddingInner+phaseSymbolHeight/2) + ' L ' +  (scale('x', datum.start)) + ' '  +   (scale('y', datum.id)+ yPaddingInner+phaseSymbolHeight) + ' z'"
        }
      ]
    },
    {
      "name": "tasks",
      "source": "input",
      "transform": [
        {
          "type": "filter",
          "expr": "datum.milestone != true"
        },
        {
          "type": "filter",
          "expr": "!indata('collapsedPhases', 'phase', datum.phase)"
        }
      ]
    },
    {
      "name": "milestones",
      "source": "input",
      "transform": [
        {
          "type": "filter",
          "expr": "datum.milestone == true"
        },
        {
          "type": "filter",
          "expr": "!indata('collapsedPhases', 'phase', datum.phase)"
        }
      ]
    },
    {
      "name": "yScale",
      "source": [
        "tasks",
        "phases",
        "milestones"
      ],
      "transform": [
        {
          "type": "lookup",
          "from": "phases",
          "key": "phase",
          "values": ["start", "end"],
          "as": ["start", "end"]
        },
        {
          "type": "aggregate",
          "groupby": ["phase"],
          "fields": ["start", "end"],
          "ops": ["min", "max"],
          "as": ["minStart", "maxEnd"]
        },
        {
          "type": "formula",
          "as": "id",
          "expr": "datum.phase"
        }
      ]
    }
  ]
}
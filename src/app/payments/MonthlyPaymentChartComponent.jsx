import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import JqxChart from '../../deps/jqwidgets-react/react_jqxchart.js';
import JqxButton from '../../deps/jqwidgets-react/react_jqxbuttons.js';
import {divPrnStyle} from '../../base/constants/AppConstants';
import {Tooltip} from 'reactstrap';
class MonthlyPaymentChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printtt: false
        }
        this.togglePrint=this.togglePrint.bind(this);
    }
    togglePrint() {
        this.setState({
            printtt: !this.state.printtt
        });
    }
    printMe(){
        let content = window.document.getElementsByClassName('monthlyChart')[0].outerHTML;
        let newWindow = window.open('', '', 'width=800, height=500'),
            document = newWindow.document.open(),
            pageContent =
                '<!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<meta charset="utf-8" />' +
                '<title>Monthly Payment to users</title>' +
                '</head>' +
                '<body>' + content + '</body></html>';
        try {
            document.write(pageContent);
            document.close();
            newWindow.print();
            newWindow.close();
        }
        catch (error) {
        }
    }
    render(){
        let mothlyChartData = this.props.monthlychartdata;
        let padding = { left: 5, top: 5, right: 5, bottom: 5 };
        let titlePadding = { left: 90, top: 0, right: 0, bottom: 10 };
        let xAxis =
            {
                dataField: 'Quarter',
                showGridLines: true
            };
        let seriesGroups =
            [
                {
                    type: 'column',
                    columnsGapPercent: 50,
                    seriesGapPercent: 0,
                    valueAxis:
                    {
                        unitInterval: 500,
                        minValue: 0,
                        maxValue: 5000,
                        displayValueAxis: true,
                        description: 'Payment in thousands',
                        axisSize: 'auto',
                        tickMarksColor: '#888888'
                    },
                    series: [
                        { dataField: 'Unprepared', displayText: 'Unprepared' },
                        { dataField: 'Prepared', displayText: 'Prepared' },
                        { dataField: 'Paid', displayText: 'Paid' }
                    ]
                }
            ];
        return (
            <div> 
            
            <JqxChart style={{ width: 850, height: 500 }} className='monthlyChart'
                title={'2018 Liabilities'} description={'2018 Liabilities Unprepared, Prepared and Paid Quarterly'}
                showLegend={true} enableAnimations={true} padding={padding}
                titlePadding={titlePadding} source={mothlyChartData} xAxis={xAxis}
                colorScheme={'scheme01'} seriesGroups={seriesGroups}
            />
            <a href="#"  style={divPrnStyle} onClick={() => this.printMe()} id="printid"> <i class="fas fa-print"></i></a>
            <Tooltip placement="left" isOpen={this.state.printtt} target="printid" toggle={this.togglePrint}>
                Print 2018 Liabilities Chart
            </Tooltip>
            </div>
        )
    }
    componentDidMount() {
    }
}
export default MonthlyPaymentChartComponent;
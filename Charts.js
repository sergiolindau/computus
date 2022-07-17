"use strict";
var GlobalScope = {};
class Charts {
    static buildFunction(code, variable, env) {
        let result = eval("(" +
            variable +
            ") => { " + (env ? (env + ";") : "") + "return (" +
            code +
            "); }");
        return result;
    }
    static buildDatasets(n) {
        let result = new Array(n);
        for (let i = 0; i < n; i++) {
            result[i] = {
                label: undefined,
                backgroundColor: 'rgb(132, 99, 255)',
                borderColor: 'rgb(132, 99, 255)',
                pointRadius: 3,
                data: [],
            };
        }
        return result;
    }
    static buildData(ndataset) {
        return {
            labels: [],
            datasets: Charts.buildDatasets(ndataset)
        };
    }
    static buildOption() {
        return {
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                    text: undefined
                },
                subtitle: {
                    display: false,
                    text: undefined
                }
            },
            scales: {
                x: {
                    title: {
                        display: false,
                        text: undefined
                    },
                    ticks: {}
                },
                y: {
                    title: {
                        display: false,
                        text: undefined
                    },
                    ticks: {}
                }
            },
            animation: {
                duration: 0 // general animation time
            },
            hover: {
                animationDuration: 0 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0 // animation duration after a resize
        };
    }
    static functionXY(container, codeX, variable, start, step, end, options) {
        if (typeof container == 'string') {
            container = document.getElementById(container);
        }
        let CanvasChart = document.createElement('canvas');
        container.append(CanvasChart);
        const data = Charts.buildData(1);
        const opt = Charts.buildOption();
        start = eval(start);
        step = eval(step);
        end = eval(end);
        let xlabelcallback;
        if (options !== undefined) {
            if (options.xlabelcallback !== undefined) {
                xlabelcallback = options.xlabelcallback;
            }
            if (options.ylabelcallback !== undefined) {
                opt.scales.y.ticks.callback = options.ylabelcallback;
            }
            if (options.legend !== undefined) {
                data.datasets[0].label = options.legend;
                opt.plugins.legend.display = true;
            }
            if (options.title !== undefined) {
                opt.plugins.title.text = options.title;
                opt.plugins.title.display = true;
            }
            if (options.subtitle !== undefined) {
                opt.plugins.subtitle.text = options.subtitle;
                opt.plugins.subtitle.display = true;
            }
            if (options.xlabel !== undefined) {
                opt.scales.x.title.text = options.xlabel;
                opt.scales.x.title.display = true;
            }
            if (options.ylabel !== undefined) {
                opt.scales.y.title.text = options.ylabel;
                opt.scales.y.title.display = true;
            }
            if (options.tooltip !== undefined) {
                opt.plugins.tooltip = options.tooltip;
            }
        }
        let fxy = this.buildFunction(codeX, variable);
        let n = Math.trunc((end - start) / step) + 1;
        for (let i = 0; i < n; i++) {
            let x_data = start + i * step;
            let y_data = fxy(x_data);
            data.labels.push((xlabelcallback !== undefined) ? (xlabelcallback(x_data)) : (x_data));
            data.datasets[0].data.push(y_data);
        }
        const config = {
            type: 'line',
            data: data,
            options: opt
        };
        const theChart = new Chart(CanvasChart, config);
    }
    static parametricXY(container, codeX, codeY, parameter, start, step, end, options, env) {
        if (typeof container == 'string') {
            container = document.getElementById(container);
        }
        let CanvasChart = document.createElement('canvas');
        CanvasChart.setAttribute('style', 'width:600px; height:600px');
        container.append(CanvasChart);
        const data = Charts.buildData(1);
        const opt = Charts.buildOption();
        start = eval(env + ";" + start);
        step = eval(env + ";" + step);
        end = eval(env + ";" + end);
        if (options !== undefined) {
            if (options.xlabelcallback !== undefined) {
                opt.scales.x.ticks.callback = options.xlabelcallback;
            }
            if (options.ylabelcallback !== undefined) {
                opt.scales.y.ticks.callback = options.ylabelcallback;
            }
            if (options.legend !== undefined) {
                data.datasets[0].label = options.legend;
                opt.plugins.legend.display = true;
            }
            if (options.title !== undefined) {
                opt.plugins.title.text = options.title;
                opt.plugins.title.display = true;
            }
            if (options.subtitle !== undefined) {
                opt.plugins.subtitle.text = options.subtitle;
                opt.plugins.subtitle.display = true;
            }
            if (options.xlabel !== undefined) {
                opt.scales.x.title.text = options.xlabel;
                opt.scales.x.title.display = true;
            }
            if (options.ylabel !== undefined) {
                opt.scales.y.title.text = options.ylabel;
                opt.scales.y.title.display = true;
            }
            if (options.tooltip !== undefined) {
                opt.plugins.tooltip = options.tooltip;
            }
        }
        opt.scales.x.type = 'linear';
        opt.scales.x.position = 'bottom';
        let fx = Charts.buildFunction(codeX, parameter, env);
        let fy = Charts.buildFunction(codeY, parameter, env);
        GlobalScope.fx = fx;
        GlobalScope.fy = fy;
        let n = Math.trunc((end - start) / step) + 1;
        for (let i = 0; i < n; i++) {
            let p_data = start + i * step;
            let x_data = GlobalScope.fx(p_data);
            let y_data = GlobalScope.fy(p_data);
            data.datasets[0].data.push({ x: x_data, y: y_data });
        }
        const config = {
            type: 'scatter',
            data: data,
            options: opt
        };
        const theChart = new Chart(CanvasChart, config);
        return theChart;
    }
    static sunChart(container, year, lat, lng, tz, options) {
        if (typeof container == 'string') {
            container = document.getElementById(container);
        }
        let CanvasChart = document.createElement('canvas');
        CanvasChart.setAttribute('style', 'width:600px; height:600px');
        container.append(CanvasChart);
        const data = Charts.buildData(13);
        const opt = Charts.buildOption();
        let start = 0;
        let step = 1;
        let end = Computus.yeardays(year) - 1;
        if (options !== undefined) {
            if (options.legend !== undefined) {
                data.datasets[0].label = options.legend;
                opt.plugins.legend.display = true;
            }
            if (options.title !== undefined) {
                opt.plugins.title.text = options.title;
                opt.plugins.title.display = true;
            }
            if (options.subtitle !== undefined) {
                opt.plugins.subtitle.text = options.subtitle;
                opt.plugins.subtitle.display = true;
            }
            if (options.xlabel !== undefined) {
                opt.scales.x.title.text = options.xlabel;
                opt.scales.x.title.display = true;
            }
            if (options.ylabel !== undefined) {
                opt.scales.y.title.text = options.ylabel;
                opt.scales.y.title.display = true;
            }
        }
        opt.plugins.tooltip = {
            callbacks: {
                label: function (context) {
                    let d = context.dataIndex + 1;
                    let date = Computus.doy2cal(year, d);
                    return (Computus.monthTable['PT'][1][date[1]] + " " + date[2] +
                        ", el: " + context.dataset.data[context.dataIndex].y +
                        ", " + (context.datasetIndex + 7) + "h");
                }
            }
        };
        opt.scales.x.type = 'linear';
        opt.scales.x.position = 'bottom';
        //        opt.scales.x.min = -3.25;
        //        opt.scales.x.max = 3.25;
        opt.scales.x.ticks.callback = function (value, index, ticks) {
            return value; //Computus.az2cardinal(value*dtan(analemma[index].el),270);
        };
        //        opt.scales.y.min = -1;
        //        opt.scales.y.max = 2.2;
        opt.scales.y.ticks.callback = function (value) {
            return value; // + "º";
        };
        const analemma = Computus.sunAnalemma(year, 12, lat, lng, tz);
        const sunchart = Computus.sunChart(year, lat, lng, tz);
        GlobalScope.fx =
            function (d) { return dcos(90 - sunchart[d][12].az) * dcos(sunchart[d][12].el) / dsin(sunchart[d][12].el); };
        GlobalScope.fy =
            //            function (d: number) { return dsin(90-sunchart[d][12].az)*dcos(sunchart[d][12].el)/dsin(sunchart[d][12].el); };
            function (d) { return sunchart[d][12].el; };
        let n = Math.trunc((end - start) / step) + 1;
        for (let h = 7; h < 18; h++) {
            data.datasets[h - 7].pointRadius = 0.6;
            for (let d = 0; d < n; d++) {
                data.datasets[h - 7].data.push({
                    x: dcos(90 - sunchart[d][h].az) * dcos(sunchart[d][h].el) / dsin(sunchart[d][h].el),
                    //                    x: dcos(dmod(90-sunchart[d][h].az)),
                    y: dsin(90 - sunchart[d][h].az) * dcos(sunchart[d][h].el) / dsin(sunchart[d][h].el),
                    //                    y: sunchart[d][h].el,
                });
            }
        }
        const config = {
            type: 'scatter',
            data: data,
            options: opt
        };
        const theChart = new Chart(CanvasChart, config);
        return theChart;
    }
}
// How to Customize Tooltip Each Scatter Chart Data Point in Chart JS
// https://www.youtube.com/watch?v=80w6gWWDJM0
// How to Add More Information in the Tooltips in Chart JS
// https://www.youtube.com/watch?v=UxJ5d-HGhJA

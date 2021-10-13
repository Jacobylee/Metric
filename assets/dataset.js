export default function data(){
    return ({
        'sm_sf': {title: 'Area', 
                  image: require("./area.png"),
                  input_name: 'Square metre',
                  rate: 10.76391041,
                  output_name: 'Square foot',
                  in_addr: 'm2',
                  out_addr: 'ft2',
                },
        'km_mi': {title: 'Distance', 
                  image: require("./distance.png"),
                  input_name: 'Kilometres',
                  rate: 0.6214,
                  output_name: 'Miles',
                  in_addr: 'km',
                  out_addr: 'mi',
                },
        'cl_fa': {title: 'Temperature', 
                  image: require("./temp.png"),
                  input_name: 'Celsius',
                  rate: 9/5,
                  output_name: 'Fahrenheit',
                  in_addr: '°C',
                  out_addr: '°F',
                },
        'kh_mh': {title: 'Speed', 
                  image: require("./speed.png"),
                  input_name: 'kilometres/hour',
                  rate: 0.62137,
                  output_name: 'miles/hour',
                  in_addr: 'km/h',
                  out_addr: '°m/h',
                },
        'kg_pd': {title: 'Weight',
                  image: require("./weight.png"),
                  input_name: 'Kilogram',
                  rate: 2.204622621849,
                  output_name: 'Pound',
                  in_addr: 'kg',
                  out_addr: 'lb',
                },
        'dy_hr': {title: 'Time',
                  image: require("./time.png"),
                  input_name: 'Day',
                  rate: 24,
                  output_name: 'Hour',
                  in_addr: 'd',
                  out_addr: 'h',
                },
        'mb_kb': {title: 'Data Storage',
                  image: require("./data_storage.png"),
                  input_name: 'MByte',
                  rate: 1024,
                  output_name: 'KByte',
                  in_addr: 'mb',
                  out_addr: 'kb',
                },
    })
}
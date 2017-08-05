import RandomColor from 'just.randomcolor';

/* rawArr: array of 10 objects + last object key is "column", value is array
{
  name:"Ben"
  Fun:"2"
  Smart:"8"
  Witty:"0"
},
...
"column":["name","Fun","Smart","Witty"]
*/

/* final data: a object contains labels and datasets
labels: array of names
datasets: array of objects like below, :

{
  backgroundColor:"rgba(43,77,54,0.3)"
  borderColor:"rgba(43,77,54,0.3)"
  borderWidth:2
  data:Array(11)    -- all people's fun data
  label:"Fun"
},
{
  backgroundColor:"rgba(43,77,54,0.3)"
  borderColor:"rgba(43,77,54,0.3)"
  borderWidth:2
  data:Array(11)    -- all people's Smart data
  label:"Smart"
},
{
  backgroundColor:"rgba(43,77,54,0.3)"
  borderColor:"rgba(43,77,54,0.3)"
  borderWidth:2
  data:Array(11)    -- all people's Witty data
  label:"Witty"
}
*/
export function array2chart(arr) {
    let obj = arr.shift();
    let formatedData = { labels: [obj.name], datasets: [] };
    let map = new Map();

    delete obj.name;
    for (let item in obj) {
        let dataset = { label: item, data: [obj[item]] };
        let color = new RandomColor().toRGBA();

        dataset.borderColor = color.toCSS();
        dataset.borderWidth = 2;

        color.value.a = .5;
        dataset.backgroundColor = color.toCSS();

        formatedData.datasets.push(dataset);
        map[item] = dataset;
    }

    arr.forEach((obj, i, a) => {
        formatedData.labels.push(obj.name);
        delete obj.name;
        for (let item in obj) {
            map[item].data.push(obj[item]);
        }
    });

    return formatedData;
}
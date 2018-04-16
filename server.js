const express = require('express');
const app = express();
const models = require('./models');
const bodyParser = require('body-parser')
const request = require('request');
const fetch = require('node-fetch');
const GOOGLE_PLACES_API_KEY = "AIzaSyCiXLi-0VHwKvLWFQM9MyUKMG-13C7BKjI"
const GOOGLE_PLACES_OUTPUT_FORMAT = "json"
const GooglePlaces = require('googleplaces');
var googlePlaces = new GooglePlaces(GOOGLE_PLACES_API_KEY, GOOGLE_PLACES_OUTPUT_FORMAT);

const Subscription = models.Subscription;
const User = models.User;
const Transaction = models.Transaction;

app.use(bodyParser.json())

// {"recommendations":[{"thing":"131624046","weight":1.345032779671177,"last_actioned_at":"2018-03-11T20:30:31-07:00","last_expires_at":"2030-10-11T17:00:00-07:00","people":["951","184","11"]},{"thing":"050343046","weight":1,"last_actioned_at":"2018-03-11T20:20:25-07:00","last_expires_at":"2030-10-11T17:00:00-07:00","people":["11"]},

app.get('/charityImage/:query', (req,res,next) => {
  parameters = {
    query: req.params.query
  };

  googlePlaces.textSearch(parameters, function (error, response) {
    if (error) throw error;
    if(response.results[0].photos) {
      googlePlaces.imageFetch({photoreference: response.results[0].photos[0].photo_reference,sensor: false}, function (error, response) {
          if (error) throw error;
          
         res.send(response)
  
      });
    }
  });

});
app.get('/recommendations/:userid', (req,res,next) => {
  console.log(req.params.userid);
  const headersOpt = {  
    "content-type": "application/json"
  };
  request({
    method:'post',
    url:'http://localhost:3456/recommendations',
    body: {
      "namespace": "charities",
      "person": req.params.userid, //Get userid from route here...
      "configuration": {
        "actions" : {"liked": 1}
      }
  }, 
    headers: headersOpt,
    json: true,
  }, async function(error, response, body){
    var charities = [];
    for(let i = 0; i < 2; i++) {
      let ein = body.recommendations[i].thing;
      const query = `https://api.data.charitynavigator.org/v2/Organizations/${ein}?app_id=f0287ce6&app_key=72b6324e6d7c52799592dfa0c07a6935`;
      const json = await fetch(query).then(response => response.json()).then(resJson => resJson);
      
      charities.push(json);
    }
    res.send(charities);

  });
});

app.get('/user', (req, res, next) => {
  models.User.findAll().then(user => res.send(user));
});

//post subscription to subscription table
app.get('/subscribe/:subInfo', (req, res, next) => {
  info = JSON.parse(req.params.subInfo);
  Subscription.findOrCreate({where:{
    charity_ein: info.charity_ein,
    type: info.type,
    frequency: info.frequency,
    amount: info.amount,
    userId: info.userId
  }.then((sub) => {
    res.send(sub);

  })
});


app.get('/user/sign-up/:info', (req, res, next) => {
  const loginObject = JSON.parse(req.params.info);
  models.User.findOrCreate({where: {
    name: loginObject.name,
    password: loginObject.password,
    email:  new String(loginObject.email).toLowerCase(),
    phone: "201-231-1412",
    address: "1 Washington Sq.",
    favorites: "Aids",
  }}).then((user) => {
    res.send(user);
  })
  
});
app.get('/user/sign-in/:info', (req, res, next) => {
  const loginObject = JSON.parse(req.params.info);
  models.User.findOne({where: {
    password: loginObject.password,
    email: new String(loginObject.email).toLowerCase(),
  }}).then( (user) => {
    res.send(user);
  })
});


app.get('/charity-search/:query', (req,res,next) => {
  const searchQuery = req.params.query;
  const query = `https://api.data.charitynavigator.org/v2/Organizations?app_id=f0287ce6&app_key=72b6324e6d7c52799592dfa0c07a6935&pageSize=20&pageNum=1&rated=true&search=${searchQuery}`;
  fetch(query).then(response => response.json()).then(resJson => res.send(resJson));
})
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// Listen to port 5000
app.listen(5000, () => {
  console.log('Dev app listening on port 5000!');
});

module.exports = app;


// const ein1 = ["010202467","010202467","010211478","010211478","010211513","010211513","010211530","010211530","010211543","010211543","010211564","010211564","010212442","010212442","010212541","010212541","010215910","010215910","010216837","010216837","010237912","010237912","010241767","010241767","010248780","010248780","010267392","010267392","010270690","010270690","010271477","010271477","010276862","010276862","010287624","010287624","010352258","010352258","010355822","010355822","010368070","010368070","010378420","010378420","010391479","010391479","010418917","010418917","010422035","010422035","010425071","010425071","010476545","010476545","010477512","010477512","010502563","010502563","010504905","010504905","010518193","010518193","010523390","010523390","010532835","010532835","010565671","010565671","010566033","010566033","010574950","010574950","010579687","010579687","010638224","010638224","010651843","010651843","010679337","010679337","010687133","010687133","010708733","010708733","010716364","010716364","010766844","010766844","010777850","010777850","010885377","010885377","010963657","010963657","016004404","016004404","016004776","016004776","016004866","016004866","016006001","016006001","016011843","016011843","016023519","016023519","020222237","020222237","020222248","020222248","020222250","020222250","020223606","020223606","020225135","020225135","020236885","020236885","020239801","020239801","020259874","020259874","020259978","020259978","020260158","020260158","020338667","020338667","020351152","020351152","020359239","020359239","020405369","020405369","020433505","020433505","020450773","020450773","020482584","020482584","020535999","020535999","020541202","020541202","020554654","020554654","020564982","020564982","020587875","020587875","020588068","020588068","020629238","020629238","020659244","020659244","020681855","020681855","020684220","020684220","020687863","020687863","020767157","020767157","026000614","026000614","026005322","026005322","026005610","026005610","026005625","026005625","026006033","026006033","026006374","026006374","026015642","026015642","030162865","030162865","030179306","030179306","030179307","030179307","030179436","030179436","030179602","030179602","030184732","030184732","030213226","030213226","030217229","030217229","030221018","030221018","030222941","030222941","030223731","030223731","030229347","030229347","030231665","030231665","030259051","030259051","030277052","030277052","030277908","030277908","030278626","030278626","030281195","030281195","030285606","030285606","030326293","030326293","030347288","030347288","030354382","030354382","030355315","030355315","030358029","030358029","030362926","030362926","030371141","030371141","030382773","030382773","030385377","030385377","030391561","030391561","030419743","030419743","030433949","030433949","030442514","030442514","030445391","030445391","030455618","030455618","030473181","030473181","030483824","030483824","030498942","030498942","030519569","030519569","030529005","030529005","041988530","041988530","042024022","042024022","042067315","042067315","042074462","042074462","042103548","042103548","042103550","042103550","042103551","042103551","042103559","042103559","042103597","042103597","042103607","042103607","042103616","042103616","042103651","042103651","042103714","042103714","042103727","042103727","042103907","042103907","042103916","042103916","042103922","042103922","042103923","042103923","042103940","042103940","042103993","042103993","042104008","042104008","042104017","042104017","042104020","042104020","042104021","042104021","042104026","042104026","042104035","042104035","042104163","042104163","042104231","042104231","042104264","042104264","042104327","042104327","042104334","042104334","042104347","042104347","042104354","042104354","042104357","042104357","042104363","042104363","042104377","042104377","042104396","042104396","042104397","042104397","042104412","042104412","042104690","042104690","042104702","042104702","042104714","042104714","042104726","042104726","042104740","042104740","042104756","042104756","042104757","042104757","042104768","042104768","042104792","042104792","042104805","042104805","042104807","042104807","042104841","042104841","042104852","042104852","042104853","042104853","042104937","042104937","042105825","042105825","042105850","042105850","042105851","042105851","042105868","042105868","042105885","042105885","042106173","042106173","042106765","042106765","042108374","042108374","042121305","042121305","042121335","042121335","042123666","042123666","042125003","042125003","042126598","042126598","042127020","042127020","042131409","042131409","042143545","042143545","042152680","042152680","042160642","042160642","042200147","042200147","042203829","042203829","042203836","042203836","042210747","042210747","042229839","042229839","042234126","042234126","042237311","042237311","042262880","042262880","042263040","042263040","042276089","042276089","042281657","042281657","042296967","042296967","042312734","042312734","042382233","042382233","042387225","042387225","042395520","042395520","042401399","042401399","042429556","042429556","042433182","042433182","042458501","042458501","042469627","042469627","042472126","042472126","042487748","042487748","042488502","042488502","042494773","042494773","042505888","042505888","042516093","042516093","042526917","042526917","042531031","042531031","042535767","042535767","042582187","042582187","042593591","042593591","042609788","042609788","042620801","042620801","042627411","042627411","042643466","042643466","042648411","042648411","042660498","042660498","042666826","042666826","042666846","042666846","042678255","042678255","042678312","042678312","042688165","042688165","042693322","042693322","042698497","042698497","042702102","042702102","042708670","042708670","042708878","042708878","042717782","042717782","042718182","042718182","042730898","042730898","042730934","042730934","042730954","042730954","042735048","042735048","042735449","042735449","042738794","042738794","042741645","042741645","042751023","042751023","042751357","042751357","042751387","042751387","042755382","042755382","042760083","042760083","042761636","042761636","042764514","042764514","042771011","042771011","042774166","042774166","042784953","042784953","042784985","042784985","042786576","042786576","042791159","042791159","042863170","042863170","042864255","042864255","042888848","042888848","042899862","042899862","042907561","042907561","042931195","042931195","042971480","042971480","042971978","042971978","042994233","042994233","043005094","043005094","043007211","043007211","043017097","043017097","043027900","043027900","043031978","043031978","043055099","043055099","043063382","043063382","043066693","043066693","043067595","043067595","043068130","043068130","043071457","043071457","043086666","043086666","043088412","043088412","043091002","043091002","043091431","043091431","043095890","043095890","043103694","043103694","043106173","043106173","043113688","043113688","043123186","043123186","043129124","043129124","043129839","043129839","043136110","043136110","043138434","043138434","043138753","043138753","043138784","043138784","043139666","043139666","043148018","043148018","043157815","043157815","043163180","043163180","043182053","043182053","043184713","043184713","043195772","043195772","043206583","043206583","043222167","043222167","043234202","043234202","043241676","043241676","043252612","043252612","043252955","043252955","043254507","043254507","043256236","043256236","043259160","043259160","043262046","043262046","043262532","043262532","043263298","043263298","043265555","043265555","043266422","043266422","043266789","043266789","043268863","043268863","043271457","043271457","043286118","043286118","043290689","043290689","043293188","043293188","043293959","043293959","043298538","043298538","043314346","043314346","043323467","043323467","043330208","043330208","043330698","043330698","043348171","043348171","043351427","043351427","043355127","043355127","043365815","043365815","043376227","043376227","043387268","043387268","043391788","043391788","043396766","043396766","043414988","043414988","043416862","043416862","043417472","043417472","043429794","043429794","043444069","043444069","043452763","043452763","043454898","043454898","043460220","043460220","043462719","043462719","043467254","043467254","043478123","043478123","043481253","043481253","043491049","043491049","043494246","043494246","043512550","043512550","043534407","043534407","043540147","043540147","043542086","043542086","043543134","043543134","043555864","043555864","043567369","043567369","043567502","043567502","043567819","043567819","043577816","043577816","043580644","043580644","043583756","043583756","043584367","043584367","043585301","043585301","043606319","043606319","043608387","043608387","043648694","043648694","043652609","043652609","043675191","043675191","043682610","043682610","043684531","043684531","043706385","043706385","043760991","043760991","043810161","043810161","043815107","043815107","046001677","046001677","046002239","046002239","046002993","046002993","046003451","046003451","046035973","046035973","046046123","046046123","046073589","046073589","046111344","046111344","046112308","046112308","046112881","046112881","046113130","046113130","046114678","046114678","046115524","046115524","046128892","046128892","046136989","046136989","046149986","046149986","046185609","046185609","046186012","046186012","048295500","048295500","050258803","050258803","050258924","050258924","050259003","050259003","050259005","050259005","050259110","050259110","050260678","050260678","050262712","050262712","050262713","050262713","050264532","050264532","050265675","050265675","050267451","050267451","050272278","050272278","050276059","050276059","050281572","050281572","050301553","050301553","050343046","050343046","050377867","050377867","050395601","050395601","050434218","050434218","050498502","050498502","050503326","050503326","050503407","050503407","050544006","050544006","050552529","050552529","050577683","050577683","050588761","050588761","056016675","056016675","060263565","060263565","060443990","060443990","060637319","060637319","060646577","060646577","060646578","060646578","060646594","060646594","060646609","060646609","060646622","060646622","060646634","060646634","060646653","060646653","060646655","060646655","060646656","060646656","060646691","060646691","060646761","060646761","060646793","060646793","060646911","060646911","060646971","060646971","060647025","060647025","060653111","060653111","060653120","060653120","060653158","060653158","060653262","060653262","060653531","060653531","060655482","060655482","060660003","060660003","060662112","060662112","060662198","060662198","060665170","060665170","060665972","060665972","060667605","060667605","060685118","060685118","060692378","060692378","060699252","060699252","060706038","060706038","060726487","060726487","060740523","060740523","060758938","060758938","060771393","060771393","060789151","060789151","060790484","060790484","060841885","060841885","060850379","060850379","060862072","060862072","060864341","060864341","060870830","060870830","060884024","060884024","060923384","060923384","060932294","060932294","060932894","060932894","060939659","060939659","060955461","060955461","060987749","060987749","060990195","060990195","060994563","060994563","061008595","061008595","061027885","061027885","061035622","061035622","061043042","061043042","061045653","061045653","061045698","061045698","061048684","061048684","061048713","061048713","061057497","061057497","061063025","061063025","061130830","061130830","061135999","061135999","061144355","061144355","061157655","061157655","061164568","061164568"]
// const ein2 = ["061178712","061178712","061214680","061214680","061240574","061240574","061253049","061253049","061253091","061253091","061263947","061263947","061309318","061309318","061343149","061343149","061354978","061354978","061362705","061362705","061389829","061389829","061422234","061422234","061422248","061422248","061435280","061435280","061436718","061436718","061438889","061438889","061444222","061444222","061445929","061445929","061453500","061453500","061468129","061468129","061480300","061480300","061484961","061484961","061504413","061504413","061507648","061507648","061510744","061510744","061517218","061517218","061522546","061522546","061539280","061539280","061540513","061540513","061597668","061597668","061597902","061597902","061611859","061611859","061613235","061613235","061625278","061625278","061664153","061664153","061669552","061669552","061693441","061693441","061710161","061710161","061711370","061711370","061722171","061722171","066002281","066002281","066026005","066026005","066026012","066026012","066036049","066036049","066051610","066051610","066060478","066060478","066062157","066062157","066068624","066068624","066071605","066071605","066073063","066073063","066100039","066100039","100008105","100008105","100008533","100008533","110332039","110332039","111630807","111630807","111630813","111630813","111633484","111633484","111649914","111649914","111660855","111660855","111666852","111666852","111672743","111672743","111687477","111687477","111770097","111770097","111782495","111782495","111833092","111833092","112013303","112013303","112104059","112104059","112106778","112106778","112136505","112136505","112201344","112201344","112213686","112213686","112247307","112247307","112306416","112306416","112417338","112417338","112427999","112427999","112444833","112444833","112454790","112454790","112475743","112475743","112494808","112494808","112495601","112495601","112510315","112510315","112517055","112517055","112519726","112519726","112524512","112524512","112594790","112594790","112622003","112622003","112632404","112632404","112642599","112642599","112645641","112645641","112656137","112656137","112656357","112656357","112666969","112666969","112676892","112676892","112706563","112706563","112724905","112724905","112729585","112729585","112730714","112730714","112734849","112734849","112741490","112741490","112764747","112764747","112767098","112767098","112779073","112779073","112840553","112840553","112843763","112843763","112926958","112926958","112940331","112940331","112949583","112949583","112974154","112974154","112981112","112981112","113035221","113035221","113129249","113129249","113133786","113133786","113136350","113136350","113142753","113142753","113158401","113158401","113161238","113161238","113174514","113174514","113185372","113185372","113195338","113195338","113245314","113245314","113247651","113247651","113313534","113313534","113317234","113317234","113344389","113344389","113355081","113355081","113431939","113431939","113459952","113459952","113473757","113473757","113485736","113485736","113533002","113533002","113571208","113571208","113573392","113573392","113579187","113579187","113585917","113585917","113632924","113632924","113644283","113644283","113655936","113655936","113662240","113662240","113692512","113692512","113704163","113704163","113720098","113720098","113731839","113731839","113769438","113769438","113800306","113800306","115324002","115324002","116000821","116000821","116003180","116003180","116003433","116003433","116037948","116037948","116042392","116042392","116101487","116101487","116107128","116107128","116156180","116156180","130432981","130432981","130433740","130433740","130434195","130434195","130552040","130552040","130854930","130854930","131084135","131084135","131275970","131275970","131427105","131427105","131548339","131548339","131562242","131562242","131562656","131562656","131568923","131568923","131573954","131573954","131592242","131592242","131606158","131606158","131610451","131610451","131611981","131611981","131614906","131614906","131617086","131617086","131623829","131623829","131623838","131623838","131623848","131623848","131623850","131623850","131623881","131623881","131623885","131623885","131623886","131623886","131623888","131623888","131623897","131623897","131623902","131623902","131623910","131623910","131623921","131623921","131623922","131623922","131623929","131623929","131623937","131623937","131623973","131623973","131623989","131623989","131623994","131623994","131624007","131624007","131624014","131624014","131624015","131624015","131624016","131624016","131624041","131624041","131624046","131624046","131624048","131624048","131624086","131624086","131624098","131624098","131624099","131624099","131624100","131624100","131624102","131624102","131624103","131624103","131624104","131624104","131624114","131624114","131624124","131624124","131624127","131624127","131624132","131624132","131624134","131624134","131624146","131624146","131624154","131624154","131624228","131624228","131624229","131624229","131624240","131624240","131624241","131624241","131628168","131628168","131628183","131628183","131632519","131632519","131632524","131632524","131635251","131635251","131635294","131635294","131641066","131641066","131641068","131641068","131641076","131641076","131641082","131641082","131644147","131644147","131655210","131655210","131655255","131655255","131656634","131656634","131656651","131656651","131656653","131656653","131656674","131656674","131659345","131659345","131659627","131659627","131664048","131664048","131664054","131664054","131665552","131665552","131669975","131669975","131673104","131673104","131675082","131675082","131679610","131679610","131679615","131679615","131681983","131681983","131683279","131683279","131685039","131685039","131687001","131687001","131688246","131688246","131691693","131691693","131693134","131693134","131740011","131740011","131740069","131740069","131760110","131760110","131761633","131761633","131764804","131764804","131766596","131766596","131771421","131771421","131773640","131773640","131776448","131776448","131776711","131776711","131777413","131777413","131788491","131788491","131789318","131789318","131790719","131790719","131790756","131790756","131804349","131804349","131809274","131809274","131810938","131810938","131818723","131818723","131825919","131825919","131832949","131832949","131834590","131834590","131835632","131835632","131837442","131837442","131840489","131840489","131844852","131844852","131845455","131845455","131846366","131846366","131847137","131847137","131854253","131854253","131854606","131854606","131866795","131866795","131866796","131866796","131867411","131867411","131878953","131878953","131879953","131879953","131882106","131882106","131882107","131882107","131887440","131887440","131889074","131889074","131893906","131893906","131893908","131893908","131915124","131915124","131919715","131919715","131919791","131919791","131930701","131930701","131932384","131932384","131933825","131933825","131945157","131945157","131946868","131946868","131951681","131951681","131962771","131962771","131965385","131965385","131969375","131969375","131978163","131978163","131982786","131982786","131985627","131985627","131991118","131991118","131996126","131996126","131997636","131997636","132298956","132298956","132500122","132500122","132508249","132508249","132522784","132522784","132531695","132531695","132535262","132535262","132535763","132535763","132548997","132548997","132552500","132552500","132554312","132554312","132563745","132563745","132566973","132566973","132569185","132569185","132571900","132571900","132572034","132572034","132572288","132572288","132574963","132574963","132578670","132578670","132584273","132584273","132584337","132584337","132590548","132590548","132590805","132590805","132596500","132596500","132603590","132603590","132612524","132612524","132613383","132613383","132617681","132617681","132621497","132621497","132621966","132621966","132626135","132626135","132628036","132628036","132634080","132634080","132638292","132638292","132642091","132642091","132654926","132654926","132658549","132658549","132662222","132662222","132665475","132665475","132666432","132666432","132666921","132666921","132670365","132670365","132671065","132671065","132682458","132682458","132685755","132685755","132700517","132700517","132709368","132709368","132711338","132711338","132722664","132722664","132725416","132725416","132735359","132735359","132742777","132742777","132753267","132753267","132756320","132756320","132758558","132758558","132759292","132759292","132761376","132761376","132765465","132765465","132768583","132768583","132773475","132773475","132805131","132805131","132805575","132805575","132805582","132805582","132808114","132808114","132829756","132829756","132831197","132831197","132835847","132835847","132838167","132838167","132838450","132838450","132847092","132847092","132847587","132847587","132860703","132860703","132867442","132867442","132867881","132867881","132875808","132875808","132876109","132876109","132877912","132877912","132881809","132881809","132887872","132887872","132890727","132890727","132896345","132896345","132898805","132898805","132899381","132899381","132907656","132907656","132909403","132909403","132911127","132911127","132912529","132912529","132933654","132933654","132934575","132934575","132940671","132940671","132941455","132941455","132941675","132941675","132943020","132943020","132947386","132947386","132947657","132947657","132948778","132948778","132949483","132949483","132961273","132961273","132966004","132966004","132968932","132968932","132985898","132985898","132986881","132986881","132989216","132989216","132989233","132989233","132992567","132992567","132992977","132992977","133003112","133003112","133004747","133004747","133014387","133014387","133015230","133015230","133020943","133020943","133021180","133021180","133022855","133022855","133030229","133030229","133031828","133031828","133035711","133035711","133038262","133038262","133039601","133039601","133041381","133041381","133045282","133045282","133048373","133048373","133055729","133055729","133059081","133059081","133062214","133062214","133062419","133062419","133065716","133065716","133072967","133072967","133076376","133076376","133077692","133077692","133081223","133081223","133081500","133081500","133091674","133091674","133091844","133091844","133098471","133098471","133100091","133100091","133100197","133100197","133101527","133101527","133102064","133102064","133104537","133104537","133106175","133106175","133106768","133106768","133108424","133108424","133115145","133115145","133116646","133116646","133116652","133116652","133118415","133118415","133127972","133127972","133130146","133130146","133131491","133131491","133131914","133131914","133132741","133132741","133140298","133140298","133145161","133145161","133146988","133146988","133148295","133148295","133149200","133149200","133155199","133155199","133156445","133156445","133163817","133163817","133166308","133166308","133170676","133170676","133170827","133170827","133170956","133170956","133171815","133171815","133174839","133174839","133179546","133179546","133179618","133179618","133187021","133187021","133191113","133191113","133193119","133193119","133197949","133197949","133200719","133200719","133204621","133204621","133213138","133213138","133214627","133214627","133217805","133217805","133223946","133223946","133224150","133224150","133234632","133234632","133240366","133240366","133248876","133248876","133255679","133255679","133258765","133258765","133264005","133264005","133267496","133267496","133268539","133268539","133268920","133268920","133271855","133271855","133272001","133272001","133275531","133275531","133277408","133277408","133280193","133280193"]
// const ein1k = ein1.concat(ein2);


// app.get('/generate-users', (req,res,next) => {
//   // Loop through all users
//   let start = 975;
//   for(let id = start; id < start+25; id++ ) {
//     // Give each user 10 random likes
//     for(let liked = 0; liked < 15; liked++) {
//       let rng = Math.floor(Math.random() * ein1k.length);

//       const headersOpt = {  
//         "content-type": "application/json"
//       };

//       request({
//         method:'post',
//         url:'http://localhost:3456/events', 
//         body: {
//             "events": [
//                   {
//                     "namespace":  "charities",
//                     "person":     id.toString(),
//                     "action":     "liked",
//                     "thing":      ein1k[rng].toString(),
//                     "expires_at": "2030-10-12"
//                   }
//                 ]
//           }, 
//         headers: headersOpt,
//         json: true,
//       }); 
   
//     }
//   }
// });

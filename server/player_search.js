
var attributes =  { 
    "QB": ['Name', 'Program','Scheme','OVR', 'Position', 'SPD', 'ACC','THP', 'TAS', 'TAM','TAD','TOR','AGI'],
    "WR": ['Name',  'Program', 'Scheme', 'OVR', 'Position', 'SPD','ACC', 'CAT', 'CIT','REL','RTE'],
    "HB": ['Name',  'Program','Scheme','OVR', 'Position', 'SPD', 'AGI', 'ACC','CAT', 'RBK','PBK'],
    "FB": ['Name',  'Program','Scheme','OVR', 'Position', 'RBK', 'PBK', 'STR', 'IMB', 'SPD','CAT','CAR','ACC'],
    "TE": ['Name',  'Program','Scheme','OVR', 'Position', 'SPD', 'RTE', 'CIT', 'CAT','ACC','AGI','RBK'],
    "OT": ['Name',  'Program','Scheme','OVR', 'Position', 'PBK', 'RBK', 'AWR', 'STR','IMB','SPD','ACC'] ,
    "OG": ['Name',  'Program','Scheme','OVR', 'Position', 'PBK', 'RBK', 'AWR', 'STR','IMB','SPD','ACC'],
    "C" : ['Name',  'Program','Scheme','OVR', 'Position', 'PBK', 'RBK', 'AWR', 'STR','IMB','SPD','ACC'],
// DEFENSE

    "DE":  ['Name', 'Program', 'OVR', 'Position', 'SPD', 'BKS', 'PST','FNM', 'PWM', 'PLR','TKL','ACC'],
    "DT":  ['Name',  'Program','OVR', 'Position', 'STR', 'PWM', 'BKS', 'PLR','AWR','TKL','SPD', 'PST'],
    "LB":  ['Name', 'Program','OVR', 'Position', 'SPD', 'PST', 'PLR', 'FNM', 'PWM','TKL','ZON','MAN',"BKS"],
    "MLB": ['Name','Program', 'OVR', 'Position', 'SPD', 'PST', 'PLR', 'FNM', 'AWR','TKL','ZON','MAN',"BKS"],
    "CB":  ['Name',  'Program','OVR', 'Position', 'SPD', 'MAN', 'ACC', 'PST','ZON','PLR','TKL','AWR',"BKS"],
    "S":   ['Name',  'Program','OVR', 'Position', 'SPD', 'ZON','MAN','PST', 'PLR', 'HTP','PST','AWR','TKL',"BKS"],
    "K":   ['Name',  'Program','OVR', 'Position', 'KIP', 'KIA', 'PAC'],
    "P":   ['Name',  'Program','OVR', 'Position', 'KIP', 'KIA', 'PAC'],
    "KR":  ['Name',  'Program','OVR', 'Position', 'SPD', 'AGI', 'ACC', 'CAR','TRU','JKM','CAT'],
    "PR":  ['Name',  'Program','OVR', 'Position', 'SPD', 'AGI', 'ACC','CAR', 'TRU','JKM','CAT'],

// Mixed:
 "latest": ['Name',  'Program','OVR', 'Position', 'SPD', 'STR', 'AGI', 'ACC', 'AWR', 'CAT', 'RBK', 'PBK', 'BKS', 'MAN', 'ZON','TKL', 'PST', 'CreationDate'],


   "root_url": "https://root-tools.xyz/display-players.php?tier=Elite",


    get_attributes: function(_type, _criteria) { 
        if (_type == 'elite' || _type == 'elites' )  return this[_criteria.toUpperCase()] 
        else { return this['latest']}
    },

    get_url: function (_type, _criteria) {
        if (_type == 'elite' || _type == 'elites' ) return this['root_url'] + "&position=" + _criteria.toUpperCase()
        if (_type == 'latest' || _type == 'recent')  return this['root_url'] + "&dateadded=1+week"
        if (_type == 'program' || _type == 'programs' ) ; return this['root_url'] + "&program=" + _criteria.charAt(0).toUpperCase() + _criteria.slice(1);
    },
    transform: function(keys) {
        var newAttr =[];
        for (i = 0 ; i<keys.length;i++) {
            if (keys[i] == "Name" ) newAttr.push("*Name");
            else if (keys[i] == "OVR" ) newAttr.push("OVR_2");
            else if (keys[i].length == 3 ) newAttr.push("_" + keys[i]);
            else newAttr.push(keys[i]+ "_2");
        
        } 
        return newAttr;
    },
    transform_sort: function(key) {
            if (key == "Name" ) return "*Name";
            else if (key == "OVR" ) return "OVR_2";
            else if (key.length == 3 ) return "_" + key;
            else return key + "_2";
    },
    
    hasSortKeys: function(string) {
        return string.includes("sortby=");

    },
    get_sortkeys: function(string) { 
        keys =  string.split("sortby=")[1].split(",");
        keys = keys.map( item=> { if (item.length == 3 ) return item.toUpperCase() 
                 else return item;} )
        return keys;
    }
}

module.exports = attributes;

﻿<!DOCTYPE html>
<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
<head>
<title></title>
<meta name="description" content="A Sankey diagram with the thickness of links indicating the flow quantity." />
<!-- Copyright 1998-2015 by Northwoods Software Corporation. -->
<meta charset="UTF-8">
<script src="go.js"></script>
<link href="../assets/css/goSampleszzz.css" rel="stylesheet" type="text/css" />  <!-- you don't need to use this -->
<!-- <script src="goSamples.js"></script> -->  <!-- this is only for the GoJS Samples framework -->
<script id="code">
  function SankeyLayout() {
    go.LayeredDigraphLayout.call(this);
  }
  go.Diagram.inherit(SankeyLayout, go.LayeredDigraphLayout);

  // Before creating the LayeredDigraphNetwork of vertexes and edges,
  // determine the desired height of each node (Shape).
  /** @override */
  SankeyLayout.prototype.createNetwork = function() {
    this.diagram.nodes.each(function(node) {
      var height = getAutoHeightForNode(node);
      var font = "bold " + Math.max(12, Math.round(height / 8)) + "pt Segoe UI, sans-serif"
      var shape = node.findObject("SHAPE");
      var text = node.findObject("TEXT");
      var ltext = node.findObject("LTEXT");
      if (shape) shape.height = height;
      if (text) text.font = font;
      if (ltext) ltext.font = font;
    });
    return go.LayeredDigraphLayout.prototype.createNetwork.call(this);
  };

  function getAutoHeightForNode(node) {
    var heightIn = 0;
    var it = node.findLinksInto()
    while (it.next()) {
      var link = it.value;
      heightIn += link.computeThickness();
    }
    var heightOut = 0;
    var it = node.findLinksOutOf()
    while (it.next()) {
      var link = it.value;
      heightOut += link.computeThickness();
    }
    var h = Math.max(heightIn, heightOut);
    if (h < 10) h = 10;
    return h;
  };

  // treat dummy vertexes as having the thickness of the link that they are in
  /** @override */
  SankeyLayout.prototype.nodeMinColumnSpace = function(v, topleft) {
    if (v.node === null) {
      if (v.edgesCount >= 1) {
        var max = 1;
        var it = v.edges;
        while (it.next()) {
          var edge = it.value;
          if (edge.link != null) {
            var t = edge.link.computeThickness();
            if (t > max) max = t;
            break;
          }
        }
        return Math.ceil(max/this.columnSpacing);
      }
      return 1;
    }
    return go.LayeredDigraphLayout.prototype.nodeMinColumnSpace.call(this, v, topleft);
  }

  /** @override */
  SankeyLayout.prototype.assignLayers = function() {
    go.LayeredDigraphLayout.prototype.assignLayers.call(this);
    var maxlayer = this.maxLayer;
    // now make sure every vertex with no outputs is maxlayer
    for (var it = this.network.vertexes.iterator; it.next() ;) {
      var v = it.value;
      var node = v.node;
      var key = node.key;
      if (v.destinationVertexes.count == 0) {
        v.layer = 0;
      }
      if (v.sourceVertexes.count == 0) {
        v.layer = maxlayer;
      }
    }
    // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is
    // (other than the ones that are the widest or tallest in their respective layer).
  };

  /** @override */
  SankeyLayout.prototype.commitLayout = function() {
    go.LayeredDigraphLayout.prototype.commitLayout.call(this);
    for (var it = this.network.edges.iterator; it.next();) {
      var link = it.value.link;
      if (link && link.curve === go.Link.Bezier) {
        // depend on Link.adjusting === go.Link.End to fix up the end points of the links
        // without losing the intermediate points of the route as determined by LayeredDigraphLayout
        link.invalidateRoute();
      }
    }
  };
  // end of SankeyLayout

  function init() {
    //if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram =
      $(go.Diagram, "myDiagram", // the ID of the DIV HTML element
        {
          initialAutoScale: go.Diagram.UniformToFill,
          "animationManager.isEnabled": false,
          layout: $(SankeyLayout,
                    {
                      setsPortSpots: false,  // to allow the "Side" spots on the nodes to take effect
                      direction: 0,  // rightwards
                      layeringOption: go.LayeredDigraphLayout.LayerOptimalLinkLength,
                      packOption: go.LayeredDigraphLayout.PackStraighten || go.LayeredDigraphLayout.PackMedian,
                      layerSpacing: 200,  // lots of space between layers, for nicer thick links
                      columnSpacing: 1
                    })
        });

    var colors = ["#AC193D/#BF1E4B", "#2672EC/#2E8DEF", "#8C0095/#A700AE", "#5133AB/#643EBF", "#008299/#00A0B1", "#D24726/#DC572E", "#008A00/#00A600", "#094AB2/#0A5BC4"];

    // this function provides a common style for the TextBlocks
    function textStyle() {
      return { font: "bold 12pt Segoe UI, sans-serif", stroke: "black", margin: 5 };
    }

    // define the Node template
    myDiagram.nodeTemplate =
      $(go.Node, go.Panel.Horizontal,
        {
          locationObjectName: "SHAPE",
          locationSpot: go.Spot.MiddleLeft,
          portSpreading: go.Node.SpreadingPacked  // rather than the default go.Node.SpreadingEvenly
        },
        $(go.TextBlock, textStyle(),
          { name: "LTEXT" },
          new go.Binding("text", "ltext")),
        $(go.Shape,
          {
            name: "SHAPE",
            figure: "Rectangle",
            fill: "#2E8DEF",  // default fill color
            stroke: null,
            strokeWidth: 0,
            portId: "",
            fromSpot: go.Spot.RightSide,
            toSpot: go.Spot.LeftSide,
            height: 50,
            width: 20
          },
          new go.Binding("fill", "color")),
        $(go.TextBlock, textStyle(),
          { name: "TEXT" },
          new go.Binding("text"))
      );

    function getAutoLinkColor(data) {
      var nodedata = myDiagram.model.findNodeDataForKey(data.from);
      var hex = nodedata.color;
      if (hex.charAt(0) == '#') {
        var rgb = parseInt(hex.substr(1, 6), 16);
        var r = rgb >> 16;
        var g = rgb >> 8 & 0xFF;
        var b = rgb & 0xFF;
        var alpha = 0.4;
        if (data.width <= 2) alpha = 1;
        var rgba = "rgba(" + r + "," + g + "," + b + ", " + alpha + ")";
        return rgba;
      }
      return "rgba(173, 173, 173, 0.25)";
    }

    // define the Link template
    myDiagram.linkTemplate =
      $(go.Link, go.Link.Bezier,
        {
          layerName: "Background",
          fromEndSegmentLength: 100 , toEndSegmentLength: 100,
          adjusting: go.Link.End
        },
        $(go.Shape, { strokeWidth: 4, stroke: "rgba(173, 173, 173, 0.25)" },
         new go.Binding("stroke", "", getAutoLinkColor),
         new go.Binding("strokeWidth", "width"))
      );

    // read in the JSON-format data from the "mySavedModel" element
    load();
  }

  function load() {
      myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
      //////////////////////////////////////  
      //////////////////////////////////////
  }
</script>

<!--[if gte mso 9]><xml>
<mso:CustomDocumentProperties>
<mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Editor msdt:dt="string">SENCORP\kerrma</mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Editor>
<mso:Order msdt:dt="string">100.000000000000</mso:Order>
<mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Author msdt:dt="string">SENCORP\kerrma</mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Author>
<mso:ContentTypeId msdt:dt="string">0x010100CDD45AEB09696B4EA516F306332D0663</mso:ContentTypeId>
</mso:CustomDocumentProperties>
</xml><![endif]-->
</head>
<body onload="init()">

<div id="myDiagram" style="xbackground-color: #696969; border: solid 1px black; width: 99%; height: 1200px"></div>


<textarea id="mySavedModel" style="width:1%;height:50px" style="display: none;"> 
{ "class": "go.GraphLinksModel",
  "nodeDataArray": [

{"key":"Entered", "text":"Entered Site", "color":"#333333"},    
{"key":"Landing", "text":"Landing Page", "color":"#ff00ff"},
{"key":"Start", "text":"Start", "color":"#0000ff"},
{"key":"Q1", "text":"Q1", "color":"#00ffff"},
{"key":"Q2", "text":"Q2", "color":"#33ffff"},
{"key":"Q3", "text":"Q3", "color":"#66ffff"},
{"key":"Q4", "ltext":"Q4", "color":"#99ffff"},
{"key":"Q5", "text":"Q5", "color":"#99cccc"},
{"key":"Q6", "text":"Q6", "color":"#669999"},
{"key":"Q7", "text":"Q7", "color":"#336666"},
{"key":"Report", "text":"Report", "color":"#00ff00"},
{"key":"LeftSite", "text":"Left Site", "color":"#ff0000"}

    ], "linkDataArray": [
   
{"from":"Landing", "to":"Start", "width":200},

{"from":"Entered", "to":"Report", "width":40},

{"from":"Start", "to":"Q1", "width":140},
{"from":"Start", "to":"LeftSite", "width":80},


{"from":"Q1", "to":"Q2", "width":90},
{"from":"Q1", "to":"LeftSite", "width":30},
{"from":"Q1", "to":"Start", "width":20},

{"from":"Q2", "to":"Q3", "width":70},
{"from":"Q2", "to":"LeftSite", "width":20},

{"from":"Q3", "to":"Q4", "width":30},
{"from":"Q3", "to":"LeftSite", "width":40},


{"from":"Q4", "to":"Q5", "width":20},
{"from":"Q4", "to":"LeftSite", "width":10},

    
{"from":"Q5", "to":"Q6", "width":15},
{"from":"Q5", "to":"LeftSite", "width":5},

{"from":"Q6", "to":"Q7", "width":10},
{"from":"Q6", "to":"LeftSite", "width":5},

{"from":"Q7", "to":"Report", "width":10},
{"from":"Q7", "to":"LeftSite", "width":2},

    
{"from":"Report", "to":"LeftSite", "width":50}
    
 ]}
</textarea> 
</div>

</div></body>
</html>

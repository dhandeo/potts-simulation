// Container class

function rgbToHex(R,G,B) { return toHex(R)+toHex(G)+toHex(B); }

function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}


function SimulationContainer() 
    {
    // Create a div for plots 
    this.divPairings = $("#pairings");
    
    
        // Create canvas and rendering context
    this.canvas =document.createElement('canvas')
    this.canvas.setAttribute("id", "pairingsCanvas")
    this.ctx =  this.canvas.getContext("2d");
    $(this.canvas).appendTo(this.divPairings);

    // Create a div for bar plots 
    this.foothold = document.createElement("div")
    this.foothold.setAttribute("id", "foothold");
    $(this.foothold).addClass("chart");
    $(this.foothold).appendTo(this.divPairings);
    // Create a svg canvas
    this.chart1 = d3.select("#foothold"); //.append("svg")
    
    // Create sims
    this.sims = [];
    this.w = 100;
    this.h = 100;
    this.barPadding = 1;
    
    //Create SVG element
    this.svg = d3.select("#foothold")
                .append("svg")
                .attr("width", this.w)
                .attr("height", this.h);


    }
    
SimulationContainer.prototype.Animate = function(timer) 
    {
    var done = 0;
    for (var i = 0; i < this.sims.length; i++) 
        {
        this.sims[i].Animate();
        this.ComputePairings();
        this.PlotPairings();
        this.UpdatePairingBarPlots();
        if(this.sims[i].done === 1) 
            {
            done ++;
            }
        if (done === this.sims.length)
            {
            alert("All Done !");
            window.clearInterval(timer);
            return 1;           
            }
        };
        return 0;
    }

SimulationContainer.prototype.Initialize = function(ncontacts, naxons, ntargets)
    {
    // Store this data 
    this.ntargets = ntargets; 
    this.ncontacts = ncontacts;
    this.naxons = naxons;
    
    // Create sims
    this.sims = [];

    for(var a = 0; a < ntargets; a++)
        {
        this.Add(new Target(ncontacts, ncontacts, naxons, a));
        }
    }

SimulationContainer.prototype.Reset = function(timer) 
    {
    for (var i = 0; i < this.sims.length; i++) 
        {
        this.sims[i].Init();
        this.sims[i].Draw();
        };
        return 0;
    }


SimulationContainer.prototype.Add = function(newsim) 
    {
    this.sims.push(newsim);        
    }

SimulationContainer.prototype.ComputePairings = function ()
    {
    // Re-initialize this.pairs 
    // Pairs is a two dimensional array with index 0 corresponding to first axon

    this.pairs = [];

    for (var i = 0; i < this.naxons ; i++)
        { 
        this.pairs.push(new Array(this.naxons));
        for (var j = 0; j < this.naxons ; j++)
            { 
            this.pairs[i][j] = 0;
            }        
        };
            
    // Computes the pair information in this.pairs
    for (var i = 0; i <  this.naxons ; i++)
        {
        for (var j = 0; j < this.naxons ; j++)
            {
            for (var n = 0; n < this.sims.length  ; n++)
                {
                if (this.sims[n].axons[i+1] > 0 && this.sims[n].axons[j+1] > 0)
                    {
                    this.pairs[i][j] ++;
                    }
                }
            }
        }
        // console.log(this.pairs);
    }

SimulationContainer.prototype.PlotPairings = function ()
    {
    // Assumes that the pairing information is stored in this.pairs
    
    var size = 20;
    // $(this.canvas).height((this.naxons + 3) * size * 1.2);

    // First move horizontally
    var padding = 20;
    for (var i = 0; i < this.naxons ; i++)
        {
        for (var j = 0; j < this.naxons ; j++)
            {
            // Decide the value colormap using the value
            var val = this.pairs[i][j];
            
            // Scale the value to 255
            val = val * 255 / this.ntargets;
             this.ctx.fillStyle = "#" + rgbToHex(val, val, val );
            this.ctx.fillRect((i+1)*size*1.2, padding +  (j+1)*size*1.2, size, size);
            };
        }
    }

    
SimulationContainer.prototype.DrawPairingsBackground = function ()
    {
    // Plots a single matrix of correlation into this.divPairings
    // Collect the data 
    var size = 20;
    // $(this.canvas).height((this.naxons + 3) * size * 1.2);
    var reqheight = (this.naxons + 3) * size * 1.2    

    this.canvas.style.width = reqheight;
    this.canvas.style.height = reqheight; 
    this.canvas.width = reqheight; 
    this.canvas.height = reqheight;

    this.ctx =  this.canvas.getContext("2d");
    // Plot legend on axes
    // First move horizontally
    var y = 0;
    var padding = 20;
    for (var i = 0; i <= this.naxons ; i++)
        {
        y = 0;
        this.ctx.fillStyle =alphabet_palette[i];
        this.ctx.fillRect(i*size*1.2, padding +  y*size*1.2, size, size);
        this.ctx.fillRect(y*size*1.2,padding +  i*size*1.2, size, size);
        y = this.naxons+1;
        this.ctx.fillRect(i*size*1.2, padding + y*size*1.2, size, size);
        this.ctx.fillRect(y*size*1.2, padding + i*size*1.2, size, size);
        };
    
    
    }
    
SimulationContainer.prototype.UpdatePairingBarPlots = function ()
    {
    var da = [];
    var w = this.w;
    var h = this.h;
    var barPadding = this.barPadding;
        
    for(var i =0; i < this.pairs.length; i++)
        {
        da.push(this.pairs[i][i]);
        }    

        this.svg.selectAll("rect")
           .data(da)
           .attr("x", function(d, i) {
                return i * (w / da.length);
           })
           .attr("y", function(d) {
                return h - (d);
           })
           .attr("width", w / da.length - barPadding)
           .attr("height", function(d) {
                return d;
           })
           .attr("fill", "teal")
           
       this.svg.selectAll("text")
            .data(da)
        .attr("x", function(d, i) {
                return i * (w / da.length);
           })
        .attr("y", function(d) { return h - d/100; })
        .attr("dx", -3) // padding-right
        .attr("dy", ".35em") // vertical-align: middle
        .attr("text-anchor", "end") // text-align: right
        .text(' ' + da);
           
    }
    
SimulationContainer.prototype.DrawPairingBarPlots = function ()
    {
    // Plots a graph for each axon, with pairings it performs 
    var dataset = [];
    
    for(var i =0; i < this.pairs.length; i++)
        {
        dataset.push(this.pairs[i][i]);
        }    

        var w = this.w;
        var h = this.h;
        var barPadding = this.barPadding;
            

        this.svg.remove();
        this.svg = d3.select("#foothold")
            .append("svg")
            .attr("width", this.w)
            .attr("height", this.h);

        this.svg.selectAll("rect")
           .data(dataset)
           .enter()
           .append("rect")
           .attr("x", function(d, i) {
                return i * (w / dataset.length);
           })
           .attr("y", function(d) {
                return h - (d * 4);
           })
           .attr("width", w / dataset.length - barPadding)
           .attr("height", function(d) {
                return 100 / d;
           })
           
       this.svg.selectAll("text")
            .data(dataset)
          .enter().append("text")
        .attr("x", function(d, i) {
                return i * (w / dataset.length);
           })
        .attr("y", function(d) { return h - d/100; })
        .attr("dx", -3) // padding-right
        .attr("dy", ".35em") // vertical-align: middle
        .attr("text-anchor", "end") // text-align: right
        .text(String);
           
    }

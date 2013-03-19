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
    // Create sims
    this.sims = [];

    }
    
SimulationContainer.prototype.Animate = function(timer) 
    {
    var done = 0;
    for (var i = 0; i < this.sims.length; i++) 
        {
        this.sims[i].Animate();
        if(this.sims[i].done === 1) 
            {
            done ++;
            }
        if (done === this.sims.length)
            {
            this.ComputePairings();
            this.PlotPairings();
//            alert("All Done !");
            window.clearInterval(timer);
            return 1;           
            }
        };
        this.ComputePairings();
        this.PlotPairings();
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
            this.ctx.fillStyle = "#FFFFFF";
            var y = this.naxons+2;
            this.ctx.fillRect(y*size*1.2, padding + (i+1)*size*1.2, size, size);
            this.ctx.fillStyle ="#000000";
            this.ctx.fillText((this.pairs[i][i]).toString(), y*size*1.2, padding + (i+1.5)*size*1.2);
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
    
SimulationContainer.prototype.DrawPairingBarPlots = function ()
    {
    // Plots a graph for each axon, with pairings it performs 
    var chart1 = d3.select(".content").append("svg")
        .attr("class", "chart")
        .attr("width", w * data.length - 1)
        .attr("height", h);
    
    chart1.selectAll("rect")
        .data(data)
      .enter().append("rect")
        .attr("x", function(d, i) { return x(i) - .5; })
        .attr("y", function(d) { return h - y(d.value) - .5; })
        .attr("width", w)
        .attr("height", function(d) { return y(d.value); });
    
    chart1.append("line")
        .attr("x1", 0)
        .attr("x2", w * data.length)
        .attr("y1", h - .5)
        .attr("y2", h - .5)
        .style("stroke", "#000");
    }

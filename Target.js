/**
 * @author dhanannjay.deo
 */


// Inherit from Simulation class 
Target.prototype = new Simulation();
Target.constructor = Target;
 
function Target( width, height, no_axons, sim_no)
    {
    // Call super constructor.
    Simulation.call( this, width, height );
    this.sim_no = sim_no + 1 ;
    this.no_axons = no_axons;
    this.palette = alphabet_palette;
    
    // Clockwise neighbor selection order starting from 3 o'clock, and y axis coming down     
    this.neighbor_order = [
    [1,0],
    [1,1],
    [0,1],
    [-1,1],
    [-1,0],
    [-1,-1],
    [0,-1],
    [1,-1]    
    ];
    

    this.Init();
    this.Draw();
    };
    
Target.prototype.Init = function() 
    {
     // Defaults to random values between 1 and 2
     // Can inherit and customize this

    $(this.status).html(this.sim_no+1).css("color","red")

    // Create axons array to store axon specific statistics while simulation runs
    this.axons = [];
    for(var i = 0 ; i < this.no_axons+1; i ++)
        {
        this.axons.push(0);
        }
    this.done = 0;
     
    for(var j = 0; j < this.y;  j++)
        {
        for(var i = 0; i < this.x;  i++)  
            {
            var newaxon =Math.floor(Math.random()*this.no_axons) + 1; 
            this.grid[j][i] = newaxon;
            this.axons[newaxon] ++;
            // this.grid[i][j] = 1;
            //console.log("Grid" + this.grid[i][j])
            }
        }      
        // console.log("axons: " + this.axons)
    };

Target.prototype.DrawContact = function(x,y,axon)
    {
    if (axon >this.palette.length -1 )
        {
        this.ctx.fillStyle =this.palette[0];
        }
     else
        {
        this.ctx.fillStyle = this.palette[axon]
        }
    //console.log(ctx.fillStyle);
    this.ctx.fillRect(x*this.size, y*this.size, this.size, this.size);
    }
        
Target.prototype.Animate = function() 
    {
    if(this.done === 1)
        {
        return;
        }
    // Find a pixel to withdraw
    // TODO: base the probability based on the fitness
    var xlocation = Math.floor(Math.random() * this.x);
    var ylocation = Math.floor(Math.random() * this.y);

    this.axons[this.grid[ylocation][xlocation]] --;
    
    var nlist = []     
    // Get the number of neighbors 
    for (var i = 0; i < this.neighbor_order.length; i++) 
        {
        var nx = xlocation + this.neighbor_order[i][0];
        var ny = ylocation + this.neighbor_order[i][1];
        
        // TODO: Can compute the neighbors lookup table for performance
        if ( (nx > this.x-1) || (nx<0)  || (ny > this.y-1) || (ny < 0))
            {
                            
            }  
        else
            {
            nlist.push([nx, ny])
            }
        }
     
    // Now select a neighbor to take its position
    var neighbor = Math.floor(Math.random() * nlist.length);
    var row = this.grid[nlist[neighbor][1]];
    var newval = row[nlist[neighbor][0]];
    this.axons[newval] ++;
    if(this.axons[newval] === this.x * this.y)
        {
        this.done = 1;
        $(this.status).html(newval).css("color","black");
        }    
    this.grid[ylocation][xlocation] = newval;
    this.DrawContact(xlocation, ylocation, newval);
    }

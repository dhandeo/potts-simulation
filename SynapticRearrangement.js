/**
 * @author dhanannjay.deo
 */


// Inherit from Simulation class 
SynapticRearrangement.prototype = new Simulation();
SynapticRearrangement.constructor = SynapticRearrangement;
 
function SynapticRearrangement( width, height, no_axons)
    {
    // Call super constructor.
    Simulation.call( this, width, height );
    this.no_axons = no_axons;
    this.palette = alphabet_palette;
    
    // Clockwise neighbor selection order starting from 3o clock, and y axis coming down     
    this.neighbor_order = [
    [1,0],
    [1,1],
    [0,1],
    [-1,1],
    [-1,0],
    [-1,-1],
    [0,-1],
    [1,1]    
    ];
    
    this.Init();
    };
    
SynapticRearrangement.prototype.Init = function() 
    {
     // Defaults to random values between 1 and 2
     // Can inherit and customize this
     
    for(var i = 0; i < this.x;  i++)
        {
        for(var j = 0; j < this.y;  j++)  
            {
            this.grid[i][j] = Math.floor(Math.random()*this.no_axons) + 1;
            // this.grid[i][j] = 1;
            //console.log("Grid" + this.grid[i][j])
            }
        }      
    };
        
SynapticRearrangement.prototype.Animate = function() 
    {
    // Find a pixel to withdraw
    // TODO: base the probability based on the fitness
    var xlocation = Math.floor(Math.random() * this.x);
    var ylocation = Math.floor(Math.random() * this.y);

    var nlist = []     
    // Get the number of neighbors 
    for (var i = 0; i < this.neighbor_order.length; i++) 
        {
        var nx = xlocation + this.neighbor_order[i][0];
        var ny = ylocation + this.neighbor_order[i][1];
        
        // TODO: Can compute the neighbors lookup table for performance
        if ( (nx >= this.x-1) || (nx<0)  || (ny >= this.y-1) || (ny < 0))
            {
                            
            }  
        else
            {
            nlist.push([nx, ny])
            }
        }
     
    // No select a neighbor to take its position
    var neighbor = Math.floor(Math.random() * nlist.length);
    try
        {
        var row = this.grid[nlist[neighbor][0]];
        var newval = row[nlist[neighbor][1]]; 
        this.grid[xlocation][ylocation] = newval;
        }
    catch(err)
        {
        console.log([xlocation, ylocation])
        console.log(nlist[neighbor])
        console.log(row)
        debugger;
        }

    this.Draw(this.ctx, 50)
    }

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
    }
    
SynapticRearrangement.prototype.Init = function() 
    {
     // Defaults to random values between 1 and 2
     // Can inherit and customize this
     
    for(var i = 0; i < this.x;  i++)
        {
        for(var j = 0; j < this.y;  j++)  
            {
            // this.grid[i][j] = Math.floor(Math.random()*this.no_axons) + 1;
            this.grid[i][j] = 1;
            //console.log(this.grid[i][j])
            }
        }      
    };
    
SynapticRearrangement.prototype.Flip = function(i,j) 
    {
    // this.grid[i][j] = this.grid[i][j] + 1;
    this.grid[i][j] = 3;
    if (this.grid[i][j] > this.no_axons)
        {
        this.grid[i][j] = 2;
        }
    //console.log(this.grid[i][j]);
    }
    
SynapticRearrangement.prototype.Animate = function() 
    {
    // Find a pixel to withdraw
    var xlocation = Math.floor(Math.random() * this.x);
    var ylocation = Math.floor(Math.random() * this.y);
     
     // Flip a pixel and move in random direction
    this.Flip(xlocation, ylocation);
    
    this.Draw(this.ctx, 15)
    }      

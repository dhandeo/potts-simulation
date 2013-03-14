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
    
SynapticRearrangement.prototype.Flip = function(i,j) 
    {
    this.grid[i][j] = this.grid[i][j] + 1;
    if (this.grid[i][j] > this.no_axons)
        {
        this.grid[i][j] = 1;
        }
    //console.log(this.grid[i][j]);
    }
    
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
    }
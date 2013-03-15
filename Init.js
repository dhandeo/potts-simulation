
function start() 
    {

    var container = new SimulationContainer();
    var timer = null;
    var playing = 0;
    
    // Add two simulations
    for(var a = 0; a < 50; a ++)
        {
        container.Add(new SynapticRearrangement(5, 5, 3, a));
        }


    $( "#play" ).button().click(function( event ) 
        {
        if(playing === 1)
            {
                    playing = 0;
                    // $("#play").button('option', 'label', 'Play / ');
                    window.clearInterval(timer);
            }
        else
            {
            playing = 1;
            timer = window.setInterval(function() 
                {
                //$("#play").button('option', 'label', 'Play');

                if(container.Animate() === 1)
                    {
                    playing = 0;
                    // $("#play").button('option', 'label', 'Play');
                    window.clearInterval(timer);
                    }
                }, 0);
            }
        });
    }

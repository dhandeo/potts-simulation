function start() 
    {

    var container = new SimulationContainer();
    var timer = null;
    var playing = 0;
<<<<<<< HEAD

    var ncontacts = 10;
    var naxons = 5;
    var ntargets = 100;

    $( "#contacts" ).slider({
      range: "min",
      value: ncontacts,
      min: 2,
      max: 100,
      slide: function( event, ui ) {
        $( "#ncontacts" ).val( ui.value );
      }
    });
    $( "#ncontacts" ).val( $( "#contacts" ).slider( "value" ) );
    ncontacts = $( "#contacts" ).slider( "option", "value" );

    $( "#axons" ).slider({
      range: "min",
      value: naxons,
      min: 2,
      max: 100,
      slide: function( event, ui ) {
        $( "#naxons" ).val( ui.value );
      }
    });
    $( "#naxons" ).val( $( "#axons" ).slider( "value" ) );
    naxons = $( "#axons" ).slider( "option", "value" );

    $( "#targets" ).slider({
      range: "min",
      value: ntargets,
      min: 1,
      max: 1000,
      slide: function( event, ui ) {
        $( "#ntargets" ).val( ui.value );
      }
    });
    $( "#ntargets" ).val( $( "#targets" ).slider( "value" ) );
    ntargets = $( "#targets" ).slider( "option", "value");

    $( "#initialize" ).button().click(function( event ) 
        {
        var ncontacts = $( "#contacts" ).slider( "option", "value" );
        var naxons = $( "#axons" ).slider( "option", "value" ) ;
        var ntargets =  $( "#targets" ).slider( "option", "value" );

        $( "#simulations" ).html("");

        container.Initialize(ncontacts, naxons, ntargets);
        container.DrawPairingsBackground();

       container.Reset();
        });
=======
    var width = 10;
    var height = 5;
    var no_axons = 6;
    var no_targets = 100;

    // Add simulations
    for(var a = 0; a < no_targets; a ++)
        {
        container.Add(new Target(width, height, no_axons, a));
        }
>>>>>>> display axon numbers on sims and on pairings plot

    $( "#reset" ).button().click(function( event ) 
        {
        container.Reset();
        });
        
    $( "#compute-pairings" ).button().click(function( event ) 
        {
        container.DrawPairingsBackground();
        container.ComputePairings();
        container.PlotPairings();
        });

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
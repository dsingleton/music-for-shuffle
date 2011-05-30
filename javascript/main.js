MusicForShufflePlayer = function()
{
    // Improved version should
    // 1. create a playlist of sound objects, pre-buffer the first
    // 2. create a np section, hide tracks list (rather than styling it)
    
    // next should get the top, then shuffle the playlist
    
    this.onload = function()
    {   
        // preload all sounds, auto-load off
        $(document.body).addClass('playing');
        var that = this;
        
        $('ol.tracks li a').click(function(event) {
            event.preventDefault();
            that.play(this);
        }); 
    }
    
    this.play = function(item)
    {
        // Cleanup this/that nonsense
        var that = this;

        var parent = $(item).parent();
        parent.addClass('active')
        if (!this.sounds[item.href]) {
            this.sounds[item.href] = soundManager.createSound({
                id: item.href,
                url: item.href,
                onfinish: function() {
                    that.play(that.next());
                    parent.removeClass('active');
                }
            });
        }
        this.sounds[item.href].play();
    }
    
    this.next = function()
    {
        // replace with something a bit^W lot more random.
        return $('ol li a').sort(function(){ return Math.round(Math.random())-0.5})[0];
    }
}


var player = new MusicForShufflePlayer();

// SM2 setup
soundManager.defaultOptions = {
    onbeforefinishtime: 50,
    autoPlay: false
};
soundManager.url = 'flash';
soundManager.flashVersion = 9;
soundManager.debugMode = false;

soundManager.onready(function(){ 
    player.onload()
});
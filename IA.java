public class IA {
    
    private final static double speed;
    private final static double error;
    private final static int green = 0;
    private final static int white = 1;
    private final static int blue = 2;

    
    
    
    public void nextStep(){
        int color = getColor();
        int lc = speed;  // left command
        int rc = speed;  // right command
        
        switch(color) {
            case green : 
                lc=lc+error; 
                rc=rc-error;
                break;
                
            case blue : 
                lc=lc-error; 
                rc=rc+error;
                break;
                
        }
        sendCommand("left",lc);
        sendCommand("right",rc);
    }



    public void bypassABlock(){
        while(isABlock()) {
            // rotate right 90°

            // move forward for XX 

            // rotate left 90°
        }
        
        // move forward for XX 

        // rotate left 90°

        while(getColor() != blue) {
            // move forward until blue
        }

        // rotate right 90°
    }
    
}

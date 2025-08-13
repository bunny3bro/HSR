import { useEffect,useState } from "react";

const Wait = () => {
    const [seconds, setSeconds] = useState(10);

    useEffect(() => {
      if (seconds === 0) {
        window.location.href = '/feedBackDataBaseHonkaiStarRailBunnySDataBasefromTheReactjsproject'; 
        return;
      }
     
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [seconds]); 
  
    return(
        <div>
            <br />
            <br />
            <br />
            <p className="timer" >{`Redirecting in ${seconds} seconds...`}</p>
        </div>
    )
}

export default Wait
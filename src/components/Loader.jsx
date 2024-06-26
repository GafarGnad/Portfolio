import { Html,useProgress } from "@react-three/drei"
const Loader = () => {

  const { progress } = useProgress();

  return (
    <Html>
      <span className="canvas-load" >
        <p style={{
          fontSize : 24,
          color : '#f1f1f1',
          fontWeight:800,
          marginTop:40
        }}>{progress.toFixed(1)}%</p>

      </span>
    </Html>
  )
}

export default Loader
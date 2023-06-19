interface ProgressProps {
    value: number
}

const ProgessCircle = (props: ProgressProps) => {
    return (
        <div class="radial-progress" style={{ "--value": `${props.value != undefined ? props.value : 0}`, "--size": "12rem", "--thickness": "2rem" }}>{props.value}%</div>
    );
}


export default ProgessCircle;

// Import Legend Components

const Title = ({title,top}) => {
    


    return (
        <>
        {title.map((ti,i) =>
            <text
            y={-top+20+i*22}
            className='graphTitle'
            >
                {ti}
            </text>

        )}
        </>
    )
}

export default Title


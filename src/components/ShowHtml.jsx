import parse from 'html-react-parser';

const ShowHtml = ({htmlText}) => {
    
    const changeHtmlData=()=>{
        if (!htmlText) return null; 
        return parse(htmlText,{
            replace: node => {
                //change
                if(node.name === 'table'){
                    node.attribs.class += 'table table-bordered table-hover table-striped'
                    return node
                }

                return node
            }
        })
    }

    return (
        <div>
            {changeHtmlData()}
        </div>
    )
}

export default ShowHtml;
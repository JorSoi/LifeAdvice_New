import MenuBar from "@/components/global/MenuBar/MenuBar";

function Type({params} : {params : {type : string}}) {
    return (
        <div>
            {params.type}
            <MenuBar page={'default'} />
        </div>
    );
}

export default Type;
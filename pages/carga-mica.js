import React, {useState} from "react";
import { getUsersCollection } from "../lib/db";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

const MicaPanel = ({ questions }) => {
    
    const URL = 'gid=418712788&single=true&output=csv'
    const registerUsers = async () => {
        await fetch(`/api/process-users-sheet/${URL}`).then(res => {console.log(555, res)})
    }
      

    return (
        <div className="bg-white min-h-[80vh]">
            <div className="my-4">
            <Heading type="h1" color="dark">
                Users Panel
            </Heading>
            </div>
            {/* {
            process.env.NODE_ENV === 'development' && */}
            <>
                <Button onClick={e => registerUsers()}>Registrar test users</Button>
            </>
            {/* } */}
            
        </div>
    );
};

export default MicaPanel;

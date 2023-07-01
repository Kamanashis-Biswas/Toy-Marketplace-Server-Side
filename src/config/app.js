import express from 'express';

export const createServer = (port)=>{
    const app = express();

    app.listen(port, ()=>console.log(`Server started at port ${port}`));
    return app;
}
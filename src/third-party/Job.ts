class Job {
    private readonly _url: string;
    private _fulfilled: boolean;
    private _promise: Promise<Response>;

    constructor(url: string){
        this._url = url;
        this._fulfilled = false;
        this._promise = null;
    }

    get fulfilled(): boolean{
        return this._fulfilled;
    }

    public async execute(token: string): Promise<void>{
        if (this._promise){
            await this._promise;
        } else {
            try {
                this._fulfilled = true;
                this._promise = fetch(this._url, {headers: {token: token}});
                await this._promise;
            } catch(e) {
                this._promise = null;
                this._fulfilled = false;
            }
        }
    }
}

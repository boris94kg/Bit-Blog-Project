class Authors {
    constructor(authorObj) {
        this.id = authorObj.id;
        this.name = authorObj.name;
        this.userName = authorObj.username;
        this.email = authorObj.email;
        this.phone = authorObj.phone;
        this.street = authorObj.address.street;
        this.lat = authorObj.address.geo.lat;
        this.lng = authorObj.address.geo.lng;
        this.city = authorObj.address.city;
        this.zipCode = authorObj.address.zipcode;
        this.companyName = authorObj.company.name;
        this.companyPhrase = authorObj.company.catchPhrase;

    }
}

export default Authors;
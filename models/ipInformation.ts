export interface IpInformation {
    ip:           string;
    localisation: Localisation;
    flag:         string;
}

export interface Localisation {
    status:      string;
    country:     string;
    countryCode: string;
    region:      string;
    regionName:  string;
    city:        string;
    zip:         string;
    lat:         number;
    lon:         number;
    timezone:    string;
    isp:         string;
    org:         string;
    as:          string;
    query:       string;
}

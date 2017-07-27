export class Settings {
    
    //static apiBase = "http://localhost:5001/api/";
    static apiBase = "http://cafeserver.azurewebsites.net/Api/api/";
    
    //static tokenEndpoint = "http://localhost:5000/connect/token";
    static tokenEndpoint = "http://cafeserver.azurewebsites.net/AuthServer/connect/token";

    static loginInfo = {
        client_id: "resourceOwner",
        client_secret: "secret",
        scope: "api+offline_access"
    }

    static geocoder = {
        apiUrl: "http://geocoder.ca/?locate=",
        authToken: "xxx",
        minimumConfidence: 0.8
    }

    static customers = {
        viewMode: "rows", //or cards
        showDeletedCustomers: false
    }

    static orders = {
        viewMode: "rows", //or cards
        showDeletedOrders: true,
        pageSize: 10
    }

    static giftcards = {
        viewMode: "row", //or cards
        showDeletedGiftCards: true,
        pageSize: 10
    }

    static reservations = {
        byDate: 
        {
                startDate: null,
                endDate: null
        },
        
        viewMode: "row", //or cards
        showDeletedReservations: true,
        pageSize: 10
    }

    static reports = {
        orders: {
            topCustomers: {
                pageSize : 5
            },
            dailySum: {
                maximumPeriodAllowed: 6 // in months
            }
        },
        reservations: {
            topCustomers: {
                pageSize : 5
            },
            dailySum: {
                maximumPeriodAllowed: 6
            }
        },
        giftCards: {
            topCustomers:{
                pageSize : 5
            },
            dailySum: {
                maximumPeriodAllowed: 6
            }
        },
        chartColors: [
            'rgba(184, 213, 77, 0.90)',
            'rgba(102, 213, 77, 0.90)',
            'rgba(73, 228, 212, 0.9)',
            'rgba(77, 168, 213, 0.90)',
            'rgba(77, 129, 213, 0.90)',
            'rgba(77, 86, 213, 0.90)',
            'rgba(125, 77, 213, 0.90)',
            'rgba(182, 77, 213, 0.90)',
            'rgba(213, 77, 154, 0.90)',
            'rgba(230, 61, 61, 0.90)',
            'rgba(230, 196, 61, 0.90)',
            'rgba(221, 230, 61, 0.90)',
            'rgba(0, 0, 0, 0.90)'
        ]
    }

    static messages = {
        pageSize: 5
    }

    static map = {
        tileServerAddress: 'http://144.217.81.75/hot/{z}/{x}/{y}.png',

    }
    
}
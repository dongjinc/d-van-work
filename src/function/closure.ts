function findCustomerCity(){
    const texasCoutomers = ['John', 'Ludwing', 'Kate']
    const californiaCustomers = ['Wade', 'Lucie','Kylie'];
    return (name: any) => texasCoutomers.includes(name)?'Texas' :
    californiaCustomers.includes(name) ? 'California' : 'Unknown';
}

const cityOfCustomer = findCustomerCity()
cityOfCustomer('John')
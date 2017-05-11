// For checking the email
export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Array of name of the months
export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

const ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function validatedate(dd, mm, yy) {
    let monthIndex = 0;
    monthNames.forEach((val, i) => {
        if (val == mm) {
            monthIndex = i + 1;
        }
    });
    if (monthIndex == 0 || dd== 0 || yy < 1905 )
        return false;
    if (monthIndex == 1 || monthIndex > 2) {
        if (ListofDays[monthIndex - 1] >= dd)
            return true;
        else
            return false;
    }
    else {
        if (((yy % 4 == 0) && (yy % 100 != 0)) || (yy % 400 == 0)) {
            if (dd <= 29)
                return true;
            else
                return false;
        }
        else {
            if (dd < 29)
                return true;
            else
                return false;
        }
    }
}

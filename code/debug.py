def isPalindrome(number):
    reversed_number = 0
    unit = 0
    temp = number
    while temp != 0:
        unit = temp % 10
        reversed_number = reversed_number * 10 + unit
        temp = int(temp / 10)
    return number == reversed_number

print(isPalindrome(6906))
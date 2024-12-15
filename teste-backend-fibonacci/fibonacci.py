def fibonacci_sequence(n):
    fibonacci = [0, 1]
    for i in range(2, n, 1):
        fibonacci.insert(i, fibonacci[i - 1] + fibonacci[i - 2])

    return fibonacci


print(fibonacci_sequence(10))
print(fibonacci_sequence(20))

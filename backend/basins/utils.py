def calculate_runoff(precipitation, curve_number):
    """
    Calculate runoff using the NRCS method.
    :param precipitation: Precipitation (P) in inches
    :param curve_number: Curve Number (CN) is a dimensionless number between 30 and 100
    :return: Runoff (Q) in inches
    """
    # Calculate initial abstraction (Ia)
    initial_abstraction = 0.2 * (1000 / curve_number - 10)

    # Calculate runoff (Q)
    if precipitation > initial_abstraction:
        runoff = (precipitation - initial_abstraction) ** 2 / (precipitation - initial_abstraction + 0.8 * (1000 / curve_number - 10))
    else:
        runoff = 0

    return max(runoff, 0) # Ensure runoff is non-negative

def calculate_tc_kirpich(length, slope):
    # Kirpich method: Tc = 0.01947 * L^0.77 * S^-0.385
    return 0.01947 * (length ** 0.77) * (slope ** -0.385)

def calculate_tc_uruguay(area, slope, runoff_coefficient):
    # Uruguay method: Tc = To + 6.625 * A^0.3 * P^-0.38 * C^-0.45
    return 6.625 * (area ** 0.3) * (slope ** -0.38) * (runoff_coefficient ** -0.45)
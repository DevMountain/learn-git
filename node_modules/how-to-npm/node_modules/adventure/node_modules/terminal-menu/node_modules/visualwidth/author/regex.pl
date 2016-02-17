#!/usr/bin/perl
use strict;
use warnings;
use utf8;
use 5.010000;
use autodie;

BEGIN { $Unicode::EastAsianWidth::EastAsian = 1 }
use Unicode::EastAsianWidth;
BEGIN { $Unicode::EastAsianWidth::EastAsian = 1 }

xxx(InFullwidth());
# xxx(InHalfwidth());

sub xxx {
    my $pattern = shift;

    my @ret;
    my @retS; # surrogates
    for my $line (split /\n/, $pattern) {
        my ($beg, $end) = split /\t/, $line;
        my $t = length($beg) >= 5 ? \@retS : \@ret;
        my $varname = length($beg) >= 5 ? 'cp' : 'c';
        if ($beg eq $end) {
            push @$t, "(0x$beg == $varname)";
        } else {
            push @$t, "(0x$beg <= $varname && $varname <= 0x$end)";
        }
    }
    say join(" || ", @ret);
    say '';
    say join(" || ", @retS);
}


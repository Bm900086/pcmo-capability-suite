#!/usr/bin/env python3
"""
Test script for alignment calculation
Tests the display width calculation for emoji and Unicode characters
"""

import unicodedata

def get_display_width(text):
    """Calculate the display width of text accounting for wide characters like emojis."""
    width = 0
    for char in text:
        # Check if character is an emoji or wide character
        if unicodedata.east_asian_width(char) in ('F', 'W'):  # Full-width or Wide
            width += 2
        elif ord(char) >= 0x1F000:  # Most emojis are in this range
            width += 2
        else:
            width += 1
    return width

def test_alignment():
    """Test the alignment with various metric names."""
    
    print("Testing Display Width Calculation:")
    print("=" * 50)
    
    test_cases = [
        "📱 Total VMs (Powered On)",
        "📦 Total VMs (All Visible)", 
        "🖥️  Total Hosts (Visible)",
        "🔧 Total Physical Cores",
        "🎯 Physical Cores per Host (Avg)",
        "🔌 CPU Sockets per Host (Avg)",
        "💾 RAM per Host (Avg) GB",
        "⚙️  vCPUs per VM (Average)",
        "🧠 RAM per VM (Average) GB",
        "💿 Provisioned Storage per VM GB"
    ]
    
    target_width = 32
    
    for metric_name in test_cases:
        display_width = get_display_width(metric_name)
        padding = max(0, target_width - display_width)
        padded_metric = f"{metric_name}{' ' * padding}"
        
        print(f"'{metric_name}'")
        print(f"  Length: {len(metric_name)}")
        print(f"  Display Width: {display_width}")
        print(f"  Padding: {padding}")
        print(f"  Result: '{padded_metric}│ VALUE │ Description'")
        print(f"  Total: {len(padded_metric + '│ VALUE │ Description')}")
        print()

def test_insights_alignment():
    """Test insights box alignment."""
    print("\nTesting Insights Box Alignment:")
    print("=" * 50)
    
    test_insights = [
        "• Consolidation Ratio: 3.6:1 (OPTIMAL)",
        "• CPU Load: 35% (BALANCED)",
        "• Memory Usage: 54% (HEALTHY)"
    ]
    
    box_width = 84  # Characters that fit in the insights box
    
    for insight in test_insights:
        display_width = get_display_width(insight)
        padding = max(0, box_width - display_width)
        
        print(f"'{insight}'")
        print(f"  Length: {len(insight)}")
        print(f"  Display Width: {display_width}")
        print(f"  Padding: {padding}")
        print(f"  Result: '║ {insight}{' ' * padding}║'")
        print()

if __name__ == "__main__":
    test_alignment()
    test_insights_alignment()
    
    print("\nAlignment Fix Summary:")
    print("=" * 50)
    print("✅ Created get_display_width() function to properly calculate emoji widths")
    print("✅ Updated _insert_metric_line() to use proper padding calculation")
    print("✅ Fixed insights box alignment using display width instead of len()")
    print("✅ Should resolve misalignment issues in dashboard display")
    print("\nThe fixes account for:")
    print("• Emoji characters (2 display units wide)")
    print("• Unicode special characters")
    print("• Proper padding calculation")
    print("• Consistent column alignment")

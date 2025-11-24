#!/usr/bin/env python3
"""
Enhanced alignment test to identify the exact misalignment issue
"""

def test_precise_alignment():
    """Test with the exact strings from the user's example."""
    
    print("Analyzing Misalignment Issue:")
    print("=" * 60)
    
    test_lines = [
        "📱 Total VMs (Powered On)",
        "📦 Total VMs (All Visible)", 
        "🖥️  Total Hosts (Visible)"
    ]
    
    print("Current lengths and character analysis:")
    for i, line in enumerate(test_lines, 1):
        print(f"\nLine {i}: '{line}'")
        print(f"  String length: {len(line)}")
        print(f"  Characters: {[c for c in line]}")
        print(f"  Unicode points: {[f'U+{ord(c):04X}' for c in line]}")
        
        # Check each character's width
        widths = []
        total_width = 0
        for char in line:
            if ord(char) >= 0x1F000:  # Emoji range
                width = 2
            elif char in ['📱', '📦', '🖥', '️']:  # Specific emojis
                width = 2
            else:
                width = 1
            widths.append(width)
            total_width += width
        
        print(f"  Character widths: {widths}")
        print(f"  Total display width: {total_width}")

def test_consistent_formatting():
    """Test a solution that ensures all lines have exactly the same format."""
    
    print("\n\nTesting Fixed-Width Solution:")
    print("=" * 60)
    
    test_cases = [
        ("📱 Total VMs (Powered On)", "1,960", "Active workload count"),
        ("📦 Total VMs (All Visible)", "2,298", "Complete VM inventory"),
        ("🖥️  Total Hosts (Visible)", "88", "Physical infrastructure")
    ]
    
    # Use a simpler approach: fixed positions
    for metric, value, desc in test_cases:
        # Method 1: Simple fixed width approach
        formatted = f"{metric:<35}│{value:>10} │ {desc}"
        print(f"Method 1: '{formatted}'")
        print(f"  Length: {len(formatted)}")
    
    print("\n" + "-" * 60)
    
    # Method 2: Character-by-character padding
    target_pos = 35  # Position where │ should appear
    
    for metric, value, desc in test_cases:
        # Count actual display width more carefully
        display_width = 0
        for char in metric:
            # More comprehensive emoji detection
            if ord(char) >= 0x1F000 or char in '📱📦🖥️⚙️🧠💿🔧🎯🔌💾':
                display_width += 2
            else:
                display_width += 1
        
        spaces_needed = target_pos - display_width
        if spaces_needed < 1:
            spaces_needed = 1  # Minimum spacing
            
        formatted = f"{metric}{' ' * spaces_needed}│{value:>10} │ {desc}"
        print(f"Method 2: '{formatted}'")
        print(f"  Display width calculated: {display_width}")
        print(f"  Spaces added: {spaces_needed}")
        print(f"  Total length: {len(formatted)}")

def test_alternative_approach():
    """Test using different alignment strategy."""
    
    print("\n\nTesting Tab-Based Alignment:")
    print("=" * 60)
    
    test_cases = [
        ("📱 Total VMs (Powered On)", "1,960", "Active workload count"),
        ("📦 Total VMs (All Visible)", "2,298", "Complete VM inventory"),
        ("🖥️  Total Hosts (Visible)", "88", "Physical infrastructure")
    ]
    
    # Method 3: Replace problematic emojis with consistent alternatives
    emoji_replacements = {
        "📱": "[VM]",
        "📦": "[ALL]", 
        "🖥️": "[HOST]"
    }
    
    print("Method 3: Using text replacements for consistency:")
    for metric, value, desc in test_cases:
        clean_metric = metric
        for emoji, replacement in emoji_replacements.items():
            clean_metric = clean_metric.replace(emoji, replacement)
        
        formatted = f"{clean_metric:<35}│{value:>10} │ {desc}"
        print(f"'{formatted}'")

if __name__ == "__main__":
    test_precise_alignment()
    test_consistent_formatting()
    test_alternative_approach()
    
    print("\n\nRecommendation:")
    print("=" * 60)
    print("The issue is complex emoji handling across different systems.")
    print("Best solution: Use a more robust character width detection")
    print("or consider using simpler ASCII symbols for consistency.")

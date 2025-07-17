<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TowingRequest;

class TowingRequestController extends Controller
{
    public function index()
    {
        return response()->json(TowingRequest::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'note' => 'nullable|string',
        ]);

        $towingRequest = TowingRequest::create($validated);

        return response()->json([
            'message' => 'Request created successfully',
            'data' => $towingRequest
        ], 201);
    }
}
